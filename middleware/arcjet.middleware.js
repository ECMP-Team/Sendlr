import aj from "../config/arcjet.js";
const arcjetMiddleware = async (req, res, next) => {
    const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
    console.log("Arcjet decision", decision);
  
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Too Many Requests" }));
        return; // Stop middleware chain
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No bots allowed" }));
        return; // Stop middleware chain
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Forbidden" }));
        return; // Stop middleware chain
      }
    } else if (decision.results.some(isSpoofedBot)) {
      // Arcjet Pro plan verifies the authenticity of common bots using IP data.
      // Verification isn't always possible, so we recommend checking the decision
      // separately.
      // https://docs.arcjet.com/bot-protection/reference#bot-verification
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
      return; // Stop middleware chain
    }

    next(); 
}

export default arcjetMiddleware;