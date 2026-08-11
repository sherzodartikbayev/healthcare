import { defineRelations } from "drizzle-orm";

import { departments } from "./department.model.js";
import { doctors } from "./doctor.model.js";
import { rooms } from "./room.model.js";
import { patients } from "./patient.model.js";
import { medicalRecords } from "./medical-records.model.js";
import { doctorWorkHistory } from "./doctor-work-history.model.js";

export const relations = defineRelations(
    {
        departments,
        doctors,
        rooms,
        patients,
        medicalRecords,
        doctorWorkHistory,
    },
    (r) => ({
        departments: {
            doctors: r.many.doctors(),
            rooms: r.many.rooms(),
        },
        doctors: {
            department: r.one.departments({
                from: r.doctors.departmentId,
                to: r.departments.id,
            }),
            medicalRecords: r.many.medicalRecords(),
            workHistory: r.many.doctorWorkHistory(),
        },
        rooms: {
            department: r.one.departments({
                from: r.rooms.departmentId,
                to: r.departments.id,
            }),
        },
        patients: {
            medicalRecords: r.many.medicalRecords(),
        },
        medicalRecords: {
            patient: r.one.patients({
                from: r.medicalRecords.patientId,
                to: r.patients.id,
            }),
            doctor: r.one.doctors({
                from: r.medicalRecords.doctorId,
                to: r.doctors.id,
            }),
        },
        doctorWorkHistory: {
            doctor: r.one.doctors({
                from: r.doctorWorkHistory.doctorId,
                to: r.doctors.id,
            }),
        },
    }),
);