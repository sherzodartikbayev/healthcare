import { NextFunction, Request, Response } from "express";
import { createPatient, deletePatient, getPatient, getPatients, updatePatient } from "../services/patient.service.js";
import BaseError from "../errors/base.error.js";
import { createPatientSchema, updatePatientSchema } from "../validations/patient.validation.js";
import { idSchema } from "../validations/index.validation.js";

export const getPatientsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await getPatients(page, limit);
        if (!result.patients.length) throw BaseError.NotFound("Patients not found");

        return res.status(200).json({ success: true, message: "Patients retrieved successfully", result });
    } catch (error) {
        next(error);
    };
};

export const getPatientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Invalid patient ID");

        const { id } = idResult.data;

        const patient = await getPatient(id);
        if (!patient) throw BaseError.NotFound("Patient not found");

        return res.status(200).json({ success: true, message: "Patient retrieved successfully", patient });
    } catch (error) {
        next(error);
    }
};

export const createPatientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = createPatientSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed", validationResult.error.issues);

        const patient = await createPatient(validationResult.data);

        return res.status(201).json({ success: true, message: "Patient created successfully", patient });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const updatePatientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Invalid patient ID", idResult.error.issues);
        const { id } = idResult.data;

        const validationResult = updatePatientSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed");

        const patient = await updatePatient(id, validationResult.data);

        return res.status(200).json({ success: true, message: "Patient updated successfully", patient });
    } catch (error) {
        next(error);
    };
};

export const deletePatientController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Invalid patient ID", idResult.error.issues);
        const { id } = idResult.data;

        await deletePatient(id);

        return res.status(200).json({ success: true, message: "Patient deleted successfully" });
    } catch (error) {
        next(error);
    };
};