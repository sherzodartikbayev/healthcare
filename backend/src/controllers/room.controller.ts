import { NextFunction, Request, Response } from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../services/room.service.js";
import { idSchema } from "../validations/index.validation.js";
import BaseError from "../errors/base.error.js";
import { createRoomSchema, updateRoomSchema } from "../validations/room.validation.js";

export const getRoomsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await getRooms();
        if (!rooms.length) throw BaseError.NotFound("Rooms not found");
        return res.status(200).json({ success: true, message: "Rooms succesfully retrieved", rooms });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const getRoomController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Validation error");
        const { id } = idResult.data;

        const room = await getRoom(id);
        if (!room) throw BaseError.NotFound("Rooms not found");
        return res.status(200).json({ success: true, message: "Room retrieved succesfully", room });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const createRoomController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = createRoomSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed");
        const data = validationResult.data;

        const room = await createRoom(data);

        return res.status(201).json({ success: true, message: "Room created successfully", room });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const updateRoomController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Validation failed");
        const { id } = idResult.data;

        const validationResult = updateRoomSchema.safeParse(req.body);
        if (!validationResult.success) throw BaseError.BadRequest("Validation failed");
        const data = validationResult.data;

        const room = await updateRoom(id, data);

        return res.status(200).json({ success: true, message: "Room updated successfully", room });
    } catch (error) {
        console.log(error);
        next(error);
    };
};

export const deleteRoomController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idResult = idSchema.safeParse(req.params);
        if (!idResult.success) throw BaseError.BadRequest("Validation failed");
        const { id } = idResult.data;

        await deleteRoom(id);

        return res.status(200).json({ success: true, message: "Room deleted successfully" });
    } catch (error) {
        console.log(error);
        next(error);
    };
};