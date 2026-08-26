import { desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import BaseError from "../errors/base.error.js";
import { medicalRecords } from "../models/medical-records.model.js";
import { doctors } from "../models/doctor.model.js";
import { CreateMedicalRecordInput, UpdateMedicalRecordInput } from "../validations/medical.validation.js";

export const getPatientMedicalRecords = async (patientId: string) => {
    try {
        const records = await db
            .select({
                id: medicalRecords.id,
                patientId: medicalRecords.patientId,
                doctorId: medicalRecords.doctorId,
                treatmentDate: medicalRecords.treatmentDate,
                diseaseType: medicalRecords.diseaseType,
                diagnosis: medicalRecords.diagnosis,
                createdAt: medicalRecords.createdAt,
                updatedAt: medicalRecords.updatedAt,

                doctor: {
                    id: doctors.id,
                    firstName: doctors.firstName,
                    lastName: doctors.lastName,
                    specialization: doctors.specialization,
                },
            })
            .from(medicalRecords)
            .innerJoin(doctors, eq(medicalRecords.doctorId, doctors.id))
            .where(eq(medicalRecords.patientId, patientId))
            .orderBy(desc(medicalRecords.treatmentDate));

        if (!records.length) throw BaseError.NotFound("Medical record not found");

        return records;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while fetching patient medical records");
    }
};

export const getOneMedicalRecord = async (id: string) => {
    try {
        const [record] = await db
            .select({
                id: medicalRecords.id,
                patientId: medicalRecords.patientId,
                doctorId: medicalRecords.doctorId,
                treatmentDate: medicalRecords.treatmentDate,
                diseaseType: medicalRecords.diseaseType,
                diagnosis: medicalRecords.diagnosis,
                createdAt: medicalRecords.createdAt,
                updatedAt: medicalRecords.updatedAt,

                doctor: {
                    id: doctors.id,
                    firstName: doctors.firstName,
                    lastName: doctors.lastName,
                    specialization: doctors.specialization,
                },
            })
            .from(medicalRecords)
            .innerJoin(
                doctors,
                eq(medicalRecords.doctorId, doctors.id)
            )
            .where(eq(medicalRecords.id, id))
            .limit(1);

        if (!record) throw BaseError.NotFound("Medical record not found");

        return record;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while fetching medical record");
    };
};

export const createMedicalRecord = async (data: CreateMedicalRecordInput) => {
    try {
        const [record] = await db
            .insert(medicalRecords)
            .values({
                patientId: data.patientId,
                doctorId: data.doctorId,
                treatmentDate: data.treatmentDate,
                diseaseType: data.diseaseType,
                diagnosis: data.diagnosis ?? null,
            })
            .returning();

        return record;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while creating medical record");
    }
};

export const updateMedicalRecord = async (id: string, data: UpdateMedicalRecordInput) => {
    try {
        const [existingRecord] = await db.select().from(medicalRecords).where(eq(medicalRecords.id, id)).limit(1);
        if (!existingRecord) throw BaseError.NotFound("Medical record not found");

        const [updatedRecord] = await db.update(medicalRecords).set({ ...data, updatedAt: new Date() })
            .where(eq(medicalRecords.id, id))
            .returning();

        return updatedRecord;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while updating medical record");
    }
};

export const deleteMedicalRecord = async (id: string) => {
    try {
        const [record] = await db.delete(medicalRecords).where(eq(medicalRecords.id, id)).returning({ id: medicalRecords.id });
        if (!record) throw BaseError.NotFound("Medical record not found");

        return record;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while deleting medical record");
    }
};