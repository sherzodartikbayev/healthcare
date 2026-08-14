export type UserRole = "ADMIN" | "DOCTOR"

export interface AuthUser {
    id?: string;
    email: string;
    role: UserRole;
}

export interface User extends AuthUser {
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