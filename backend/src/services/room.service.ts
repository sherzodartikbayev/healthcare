import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import BaseError from "../errors/base.error.js";
import { rooms } from "../models/room.model.js";
import { createRoomInput, updateRoomInput } from "../validations/room.validation.js";

export const getRooms = async () => {
    try {
        const allRooms = await db.select().from(rooms);
        return allRooms;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError('Error while getting rooms');
    };
};

export const getRoom = async (id: string) => {
    try {
        const [room] = await db.select().from(rooms).where(eq(rooms.id, id)).limit(1);
        if (!room) throw BaseError.NotFound("Room not found");
        return room;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while getting room");
    };
};

export const createRoom = async (data: createRoomInput) => {
    try {
        const [newRoom] = await db.insert(rooms).values(data).returning();
        if (!newRoom) throw BaseError.NotFound("Room not found");
        return newRoom;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while creating room");
    };
};

export const updateRoom = async (id: string, data: updateRoomInput) => {
    try {
        const [existingRoom] = await db.select().from(rooms).where(eq(rooms.id, id)).limit(1);
        if (!existingRoom) throw BaseError.NotFound("Room not found");

        const updatedRoom = await db
            .update(rooms)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(rooms.id, id))
            .returning();

        if (!updatedRoom) throw BaseError.NotFound("Room not found");

        return updatedRoom;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while updating room");
    };
};

export const deleteRoom = async (id: string) => {
    try {
        const deletedRoom = await db.delete(rooms).where(eq(rooms.id, id)).returning({ id: rooms.id });
        if (!deletedRoom) throw BaseError.NotFound("Room not found");
        return deletedRoom;
    } catch (error) {
        if (error instanceof BaseError) throw error;
        console.log(error);
        throw BaseError.InternalServerError("Error while deleting room");
    };
};

