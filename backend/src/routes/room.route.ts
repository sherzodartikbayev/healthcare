import express from 'express';
import { createRoomController, deleteRoomController, getRoomController, getRoomsController, updateRoomController } from '../controllers/room.controller.js';
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', protect, authorize("ADMIN"), getRoomsController);
router.get('/:id', protect, authorize("ADMIN"), getRoomController);
router.post('/', protect, authorize("ADMIN"), createRoomController);
router.patch('/:id', protect, authorize("ADMIN"), updateRoomController);
router.delete('/:id', protect, authorize("ADMIN"), deleteRoomController);

export default router;
