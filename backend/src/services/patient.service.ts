import { count, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import BaseError from "../errors/base.error.js";
import { patients } from "../models/patient.model.js";
import { CreatePatientInput, UpdatePatientInput } from "../validations/patient.validation.js";

export const getPatients = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const [result, totalResult] = await Promise.all([
            db.select().from(patients).limit(limit).offset(offset),
            db.select({ count: count() }).from(patients)
        ]);

        const total = Number(totalResult[0]?.count ?? 0);

        return {
            patients: result,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1,
            },
        };
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while fetching patients");
    };
};

export const getPatient = async (id: string) => {
    try {
        const [patient] = await db.select().from(patients).where(eq(patients.id, id)).limit(1);
        return patient;
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while fetching patient");
    }
};

export const createPatient = async (data: CreatePatientInput) => {
    try {
        const [newPatient] = await db.insert(patients)
            .values({ ...data, weight: data.weight?.toString(), height: data.height?.toString() })
            .returning();

        return newPatient;
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while creating patient");
    };
};

export const updatePatient = async (id: string, data: UpdatePatientInput) => {
    try {
        const [updatedPatient] = await db.update(patients)
            .set({
                ...data,
                weight: data.weight?.toString(),
                height: data.height?.toString(),
                updatedAt: new Date(),
            })
            .where(eq(patients.id, id))
            .returning();

        if (!updatedPatient) throw BaseError.NotFound("Patient not found");

        return updatedPatient;
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while updating patient");
    }
};

export const deletePatient = async (id: string) => {
    try {
        const [deletedPatient] = await db.delete(patients).where(eq(patients.id, id)).returning({ id: patients.id });
        if (!deletedPatient) throw BaseError.BadRequest("Patient not found");
        return deletedPatient;
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while deleting patient");
    };
};