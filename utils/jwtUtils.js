import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const createToken = (payload, expiresIn = null) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

export { createToken, verifyToken };
