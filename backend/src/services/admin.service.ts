import { db } from "../config/db.js";
import BaseError from "../errors/base.error.js";
import { departments } from "../models/department.model.js";
import { doctors } from "../models/doctor.model.js";
import { patients } from "../models/patient.model.js";
import { rooms } from "../models/room.model.js";

export const getDashboardData = async () => {
    try {
        const doctorsCount = (await db.select().from(doctors)).length;
        const patientsCount = (await db.select().from(patients)).length;
        const roomsCount = (await db.select().from(rooms)).length;
        const departmentCount = (await db.select().from(departments)).length;

        return [
            {
                id: 1,
                label: "Hodimlar",
                icon: '/icons/dashboard/staff.svg',
                count: doctorsCount
            },
            {
                id: 2,
                label: "Bemorlar",
                icon: '/icons/dashboard/patients.svg',
                count: patientsCount
            },
            {
                id: 3,
                label: "Palatalar",
                icon: '/icons/dashboard/rooms.svg',
                count: roomsCount
            },
            {
                id: 4,
                label: "Bo'limlar",
                icon: '/icons/dashboard/departments.svg',
                count: departmentCount
            },
        ];
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while getting dashboard data");
    }
};
