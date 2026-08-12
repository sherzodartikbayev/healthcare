export type UserRole = "ADMIN" | "DOCTOR"

export interface UserToken {
    id?: string
    email: string
    role: UserRole
}

export interface User extends UserToken {
    name: string
    password: string
}

export type DoctorSpecialization =
    | "CARDIOLOGY"
    | "NEUROLOGY"
    | "PEDIATRICS"
    | "SURGERY"
    | "DERMATOLOGY"
    | "OPHTHALMOLOGY"
    | "DENTISTRY"
    | "GYNECOLOGY"
    | "UROLOGY"
    | "ORTHOPEDICS"
    | "RADIOLOGY"
    | "ANESTHESIOLOGY"
    | "PSYCHIATRY"
    | "ONCOLOGY"
    | "GENERAL_PRACTICE"