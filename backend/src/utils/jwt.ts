import jwt from "jsonwebtoken";
import BaseError from "../errors/base.error.js";
import { UserRole } from "../types/index.js";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

interface JwtPayload {
    id: string;
    email: string;
    role: UserRole;
}

export const jwttoken = {
    sign(payload: JwtPayload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
    },

    verify(token: string): JwtPayload {
        try {
            return jwt.verify(token, JWT_SECRET) as JwtPayload;
        } catch {
            throw BaseError.Unauthorized("Invalid or expired token");
        }
    },
};