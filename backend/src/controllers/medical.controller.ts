import { NextFunction, Request, Response } from "express";
import { idSchema } from "../validations/index.validation.js";
import BaseError from "../errors/base.error.js";
import { createMedicalRecord, deleteMedicalRecord, getOneMedicalRecord, getPatientMedicalRecords, updateMedicalRecord } from "../services/medical.service.js";
import { createMedicalRecordSchema, medicalRecordIdSchema, updateMedicalRecordSchema } from "../validations/medical.validation.js";

export const getMedicalRecordsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.InternalServerError("Error while getting medical record");
        const { id: patientId } = idResult.data;

        const medicalRecord = await getPatientMedicalRecords(patientId);

        return res.status(200).json({
            success: true, message: "Medical records retrieved successfully", medicalRecord
        });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const getMedicalRecordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = idSchema.safeParse(req.params);
        if (!result.success) throw BaseError.BadRequest("Invalid medical record ID", result.error.issues);

        const record = await getOneMedicalRecord(result.data.id);

        return res.status(200).json({ success: true, message: "Medical record retrieved successfully", record });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const createMedicalRecordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = createMedicalRecordSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed", validationResult.error.issues);

        const record = await createMedicalRecord(validationResult.data);

        return res.status(201).json({ success: true, message: "Medical record successfully created", record });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const updateMedicalRecordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = medicalRecordIdSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Invalid medical record ID", idResult.error.issues);

        const validationResult = updateMedicalRecordSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed", validationResult.error.issues);

        const record = await updateMedicalRecord(idResult.data.id, validationResult.data);

        return res.status(200).json({ success: true, message: "Medical record successfully updated", record });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const deleteMedicalRecordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = medicalRecordIdSchema.safeParse(req.params);
        if (!result.success) throw BaseError.BadRequest("Invalid medical record ID", result.error.issues);

        await deleteMedicalRecord(result.data.id);

        return res.status(200).json({ success: true, message: "Medical record successfully deleted" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};