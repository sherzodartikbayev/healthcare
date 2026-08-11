import jwt from 'jsonwebtoken';
import { UserToken } from '../types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-key-please-change-in-production';
const JWT_EXPIRES_IN = '1d';

export const jwttoken = {
    sign: (payload: UserToken) => {
        try {
            return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        } catch (error) {
            throw new Error('Failed to authenticate token', { cause: error });
        }
    },
    verify: (token: string) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error('Failed to authenticate token', { cause: error });
        }
    },
};