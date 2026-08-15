import express from 'express';
import { createDepartmentController, deleteDepartmentController, getDepartmentController, getDepartmentsController, updateDepartmentController } from '../controllers/department.controller.js';

const router = express.Router();

router.get('/', getDepartmentsController);
router.get('/:id', getDepartmentController);
router.post('/', createDepartmentController);
router.patch('/:id', updateDepartmentController);
router.delete('/:id', deleteDepartmentController);

export default router;