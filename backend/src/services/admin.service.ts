import { db } from "../config/db.js";
import BaseError from "../errors/base.error.js";
import { doctors } from "../models/doctor.model.js";
import { patients } from "../models/patient.model.js";
import { rooms } from "../models/room.model.js";

export const getDashboardData = async () => {
    try {
        const doctorsCount = (await db.select().from(doctors)).length;
        const patientsCount = (await db.select().from(patients)).length;
        const roomsCount = (await db.select().from(rooms)).length;

        return { doctorsCount, patientsCount, roomsCount };
    } catch (error) {
        console.log(error);
        throw BaseError.InternalServerError("Error while updating doctor");
    }
};