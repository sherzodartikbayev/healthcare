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
