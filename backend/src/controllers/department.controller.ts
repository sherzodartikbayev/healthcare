import { NextFunction, Request, Response } from "express";
import { createDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment } from "../services/department.service.js";
import BaseError from "../errors/base.error.js";
import { idSchema } from "../validations/index.validation.js";
import { createDepartmentSchema, updateDepartmentSchema } from "../validations/department.validation.js";

export const getDepartmentsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const departments = await getDepartments();
        if (!departments.length) throw BaseError.NotFound("Departments not found");

        return res.status(200).json({ success: true, message: "Departments retrieved successfully", departments });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const getDepartmentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Validation failed");
        const { id } = idResult.data;

        const department = await getDepartment(id);
        if (!department) throw BaseError.NotFound("Departments not found");

        return res.status(200).json({ success: true, message: "Department retrieved successfully", department });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const createDepartmentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = createDepartmentSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed");
        const data = validationResult.data;

        const department = await createDepartment(data);

        return res.status(201).json({ success: true, message: "Department created successfully", department });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const updateDepartmentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("");
        const { id } = idResult.data;

        const validationResult = updateDepartmentSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed");
        const data = validationResult.data;

        const department = await updateDepartment(id, data);

        return res.status(201).json({ success: true, message: "Department updated successfully", department });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const deleteDepartmentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Validation failed");
        const { id } = idResult.data;

        await deleteDepartment(id);

        return res.status(200).json({ success: true, message: "Department deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    };
};