import express from 'express';
import { authRoutes } from './apis/authModule/auth.routes';
import { userRoutes } from './apis/userModule/user.routes';
import authGuard from './helpers/authGuard.helper';

const appRoutes = express.Router()

appRoutes.use("/api/v1/auth", authRoutes);

appRoutes.use("/api/v1/user", authGuard, userRoutes)

export { appRoutes }