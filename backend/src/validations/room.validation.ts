import { z } from "zod";

export const createRoomSchema = z.object({
    departmentId: z.string().uuid("Invalid department ID"),
    roomNumber: z.number().min(1, "Room number is required").max(50, "Room number must be at most 50 characters"),
    floor: z.number().int("Floor must be an integer").optional(),
    capacity: z.number().int("Capacity must be an integer").min(1, "Capacity must be at least 1").default(1),
    patients: z.array(z.string().uuid("Invalid patient ID")).default([]),
    description: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export const updateRoomSchema = createRoomSchema.partial();

export type createRoomInput = z.infer<typeof createRoomSchema>;
export type updateRoomInput = z.infer<typeof updateRoomSchema>;
