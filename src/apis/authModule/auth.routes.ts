import express from "express"
import authController from "./auth.controller";
import authService from "./auth.service";

const authRoutes = express.Router();

authRoutes.post('/sign-up', authController.signUp, authService.signUp);

authRoutes.post('/sign-in', authController.signIn);

export { authRoutes }