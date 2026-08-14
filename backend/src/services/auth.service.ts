import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';
import { users } from '../models/user.model.js';
import { User } from '../types/index.js';
import BaseError from '../errors/base.error.js';

export const hashPassword = async (password: string) => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error("Error hashing", { cause: error });
    }
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing password', { cause: error });
    }
};

export const createUser = async ({ name, email, password, role = "ADMIN" }: User) => {
    try {
        const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser.length > 0) throw BaseError.Conflict("User with this email already exists");

        const passwordHash = await hashPassword(password);

        const [newUser] = await db.insert(users).values({ name, email, password: passwordHash, role })
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            });

        return newUser;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        throw BaseError.InternalServerError("Error while creating user");
    }
};

export const authenticateUser = async ({ email, password }: { email: string; password: string; }) => {
    try {
        const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (!existingUser) throw BaseError.NotFound("User not found");

        const isPasswordValid = await comparePassword(password, existingUser.password);

        if (!isPasswordValid) throw BaseError.BadRequest("Invalid password");

        return {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            createdAt: existingUser.createdAt,
            updatedAt: existingUser.updatedAt,
        };
    } catch (error) {
        if (error instanceof BaseError) throw error;
        throw BaseError.InternalServerError("Error while authenticating user");
    }
};