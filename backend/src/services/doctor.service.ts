import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { doctors } from "../models/doctor.model.js";
import BaseError from "../errors/base.error.js";
import { CreateDoctorInput, UpdateDoctorInput } from "../types/doctor.type.js";

export const getAllDoctors = async () => {
    try {
        const allDoctors = await db.select().from(doctors);
        return allDoctors;
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError('Error while fetching doctors');
    }
};

export const getOneDoctor = async (id: string) => {
    try {
        const [doctor] = await db.select().from(doctors).where(eq(doctors.id, id)).limit(1);
        if (!doctor) throw BaseError.NotFound('Doctor not found');
        return doctor;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        throw BaseError.InternalServerError("Error while fetching doctor");
    }
};

export const createDoctor = async (data: CreateDoctorInput) => {
    try {
        const [doctor] = await db.insert(doctors).values(data).returning();
        return doctor;
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while creating doctor");
    };
};

export const updateDoctor = async (id: string, data: UpdateDoctorInput,) => {
    try {
        const [existingDoctor] = await db.select().from(doctors).where(eq(doctors.id, id)).limit(1);

        if (!existingDoctor) throw BaseError.NotFound("Doctor not found");

        const [doctor] = await db.update(doctors)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(doctors.id, id))
            .returning();

        return doctor;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        throw BaseError.InternalServerError("Error while updating doctor");
    }
};

export const deleteDoctor = async (id: string) => {
    try {
        const [doctor] = await db.delete(doctors).where(eq(doctors.id, id)).returning();
        return doctor;
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while deleting doctor");
    };
};