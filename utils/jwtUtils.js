import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const createToken = (payload, expiresIn = '1d') => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

const verifyToken = (token) => {
    console.log(token);
    if (!token.startsWith("Bearer ")) {
        throw new Error("Invalid token");
    }
    const formatedToken = token.split(" ")[1];
    
    return jwt.verify(formatedToken, JWT_SECRET);
}

export { createToken, verifyToken };
