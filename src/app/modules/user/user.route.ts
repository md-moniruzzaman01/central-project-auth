import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '@middlewares/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post('/create-employee', UserController.createEmployee);

router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserSchema),
  UserController.createAdmin,
);

router.post('/create-principal', UserController.createPrincipal);
router.post('/create-partner', UserController.createPartner);

export const UserRoutes = router;
