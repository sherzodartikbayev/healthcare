import { NextFunction, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { authenticateUser, createUser, getCurrentUser } from "../services/auth.service.js";
import { jwttoken } from "../utils/jwt.js";
import { cookies } from "../utils/cookies.js";
import BaseError from "../errors/base.error.js";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = loginSchema.safeParse(req.body);

        if (!validationResult.success) {
            throw BaseError.BadRequest("Validation failed", [validationResult.error.issues[0].message]);
        }

        const { email, password } = validationResult.data;

        const user = await authenticateUser({ email, password });

        const token = jwttoken.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        cookies.set(res, 'token', token);

        return res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = registerSchema.safeParse(req.body);

        if (!validationResult.success) {
            throw BaseError.BadRequest("Validation failed", [validationResult.error.issues[0].message]);
        }

        const { name, email, password, role } = validationResult.data;

        const newUser = await createUser({ name, email, password, role });

        const token = jwttoken.sign({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
        });

        cookies.set(res, 'token', token);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        cookies.clear(res, 'token');

        return res.status(200).json({ message: "User signed out successfully!" });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.id) throw BaseError.Unauthorized("Authentication required");

        const user = await getCurrentUser(req?.user?.id);

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.log(error);
        next(error);
    }
};