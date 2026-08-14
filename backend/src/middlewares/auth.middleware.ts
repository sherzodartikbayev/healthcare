import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/base.error.js";
import { jwttoken } from "../utils/jwt.js";
import { UserRole } from "../types/index.js";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;
        if (!token) throw BaseError.Unauthorized("Authentication required");

        const decoded = jwttoken.verify(token);

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error) {
        if (error instanceof BaseError) return next(error);

        return next(BaseError.Unauthorized("Invalid or expired token")
        );
    }
};

export const authorize = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) throw BaseError.Unauthorized("Authentication required");

            if (!roles.includes(req.user.role)) {
                throw BaseError.Forbidden("You do not have permission to perform this action");
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};