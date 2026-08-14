import { NextFunction, Request, Response } from "express";
import { getDashboardData } from "../services/admin.service.js";

export const getDashboardController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await getDashboardData();
        return res.status(200).json({ success: true, message: "Dashboard retrieved successfully", data });
    } catch (error) {
        next(error);
    };
};