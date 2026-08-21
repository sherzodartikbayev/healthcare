import express from 'express';
import { createDepartmentController, deleteDepartmentController, getDepartmentController, getDepartmentsController, updateDepartmentController } from '../controllers/department.controller.js';
import { authorize, protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', protect, authorize("ADMIN"), getDepartmentsController);
router.get('/:id', protect, authorize("ADMIN"), getDepartmentController);
router.post('/', protect, authorize("ADMIN"), createDepartmentController);
router.patch('/:id', protect, authorize("ADMIN"), updateDepartmentController);
router.delete('/:id', protect, authorize("ADMIN"), deleteDepartmentController);

export default router;
