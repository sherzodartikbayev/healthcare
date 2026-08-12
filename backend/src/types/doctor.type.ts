import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
    doctors,
    doctorSpecializationEnum,
} from "../models/doctor.model.js";

export type Doctor = InferSelectModel<typeof doctors>;

export type CreateDoctor = InferInsertModel<typeof doctors>;

export type UpdateDoctor = Partial<CreateDoctor>;

export type DoctorSpecialization = typeof doctorSpecializationEnum.enumValues[number];

export interface CreateDoctorInput {
    firstName: string
    lastName: string
    middleName: string
    phone?: string
    specialization: DoctorSpecialization;
    departmentId: string
    roomId?: string
}

export interface UpdateDoctorInput {
    firstName?: string
    lastName?: string
    middleName?: string
    phone?: string
    specialization?: DoctorSpecialization;
    departmentId?: string
    roomId?: string
}