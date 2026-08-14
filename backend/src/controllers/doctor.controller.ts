import { NextFunction, Request, Response } from "express";
import { createDoctor, deleteDoctor, getAllDoctors, getOneDoctor, updateDoctor } from "../services/doctor.service.js";
import { createDoctorSchema, doctorIdSchema, updateDoctorSchema } from "../validations/doctor.validation.js";
import BaseError from "../errors/base.error.js";

export const getDoctorsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await getAllDoctors(page, limit);
        if (!result.doctors.length) throw BaseError.NotFound("Doctors not found");

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getDoctorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = doctorIdSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Invalid doctor ID", idResult.error.issues);
        const { id } = idResult.data;

        const doctor = await getOneDoctor(id);
        if (!doctor) throw BaseError.NotFound("Doctor not found");

        return res.status(200).json({ success: true, message: "Doctor retrieved successfully", doctor });
    } catch (error) {
        next(error);
    };
};

export const createDoctorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = createDoctorSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed");

        const doctor = await createDoctor(validationResult.data);

        return res.status(201).json({ success: true, message: "Doctor created successfully", doctor });
    } catch (error) {
        next(error);
    };
};

export const updateDoctorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = doctorIdSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Invalid doctor ID", idResult.error.issues);
        const { id } = idResult.data;

        const validationResult = updateDoctorSchema.safeParse(req.body);

        if (!validationResult.success) {
            throw BaseError.BadRequest("Validation failed", validationResult.error.issues);
        }

        const doctor = await updateDoctor(id, validationResult.data);

        return res.status(200).json({ success: true, message: "Doctor successfully updated", doctor });
    } catch (error) {
        next(error);
    }
};

export const deleteDoctorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = doctorIdSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Invalid doctor ID", idResult.error.issues);
        const { id } = idResult.data;

        await deleteDoctor(id);

        return res.status(200).json({ success: true, message: 'Doctor deleted successfully' });
    } catch (error) {
        next(error);
    };
};