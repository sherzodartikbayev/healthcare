import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import BaseError from "../errors/base.error.js";
import { departments } from "../models/department.model.js";
import { createDepartmentInput, updateDepartmentInput } from "../validations/department.validation.js";
import { doctors } from "../models/doctor.model.js";

export const getDepartments = async () => {
    try {
        const allDepartments = await db.select().from(departments);
        return allDepartments;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while getting departments");
    };
};

export const getDepartment = async (id: string) => {
    try {
        const [department] = await db.select().from(departments).where(eq(departments.id, id)).limit(1);
        return department;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while getting departments");
    };
};

export const createDepartment = async (data: createDepartmentInput) => {
    try {
        const newDepartment = await db.insert(departments).values(data).returning();
        return newDepartment;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while creating department");
    }
};

export const updateDepartment = async (id: string, data: updateDepartmentInput) => {
    try {
        const [existingDepartment] = await db.select().from(departments).where(eq(departments.id, id)).limit(1);
        if (!existingDepartment) throw BaseError.NotFound("Department not found");

        const newDepartment = await db
            .update(departments)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(departments.id, id))
            .returning();

        return newDepartment;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while updating department");
    }
};

export const deleteDepartment = async (id: string) => {
    try {
        const doctor = await db.select({ id: doctors.id }).from(doctors).where(eq(doctors.departmentId, id));
        if (doctor.length > 0) throw BaseError.BadRequest("Cannot delete department because it has assigned doctors");

        const [deletedDepartment] = await db.delete(departments).where(eq(departments.id, id)).returning({ id: departments.id });
        if (!deletedDepartment) throw BaseError.NotFound("Department not found");

        return deletedDepartment;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while deleting department");
    };
};