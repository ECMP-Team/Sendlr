import helmet from "helmet";

/**
 * Custom security headers middleware using Helmet
 * Configures various HTTP headers to enhance security
 */
const securityMiddleware = helmet({
  // Content Security Policy
  // Controls which resources are allowed to load
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Default fallback - only allow from same origin
      scriptSrc: ["'self'"], // Scripts only from same origin
      styleSrc: ["'self'", "'unsafe-inline'"], // Styles from same origin and inline
      imgSrc: ["'self'", "data:"], // Images from same origin and data URIs
      connectSrc: ["'self'"], // Fetch, XHR, WebSocket only to same origin
      fontSrc: ["'self'"], // Fonts only from same origin
      objectSrc: ["'none'"], // Block <object>, <embed>, and <applet>
      mediaSrc: ["'self'"], // Audio and video only from same origin
      frameSrc: ["'none'"], // Block iframes
      formAction: ["'self'"], // Form submissions only to same origin
      upgradeInsecureRequests: [], // Upgrade HTTP to HTTPS for all requests
    },
  },

  // Cross-Origin Resource Policy
  // Controls whether resource can be shared cross-origin
  crossOriginResourcePolicy: { policy: "same-origin" },

  // Cross-Origin Embedder Policy
  // Controls whether document can load cross-origin resources
  crossOriginEmbedderPolicy: { policy: "require-corp" },

  // Strict Transport Security
  // Forces HTTPS connections
  hsts: {
    maxAge: 15552000, // 180 days in seconds
    includeSubDomains: true, // Apply to all subdomains
    preload: true, // Ready for HSTS preload list submission
  },

  // X-Frame-Options
  // Prevents clickjacking through iframes
  frameguard: {
    action: "deny", // Never allow framing
  },

  // X-Content-Type-Options
  // Prevents MIME type sniffing
  contentTypeOptions: true,

  // Referrer Policy
  // Controls referrer information sent on navigation
  referrerPolicy: {
    policy: ["strict-origin-when-cross-origin"],
  },

  // X-XSS-Protection
  // Helps prevent XSS attacks in older browsers
  xssFilter: true,

  // X-DNS-Prefetch-Control
  // Controls DNS prefetching
  dnsPrefetchControl: {
    allow: false, // Disable DNS prefetching
  },

  // X-Download-Options
  // Prevents Internet Explorer from executing downloads
  ieNoOpen: true,

  // X-Permitted-Cross-Domain-Policies
  // Controls loading content in Adobe products
  permittedCrossDomainPolicies: {
    permittedPolicies: "none",
  },

  // Origin-Agent-Cluster
  // Prevents cross-origin resources from observing same-origin pages
  originAgentCluster: true,
});

export default securityMiddleware;
