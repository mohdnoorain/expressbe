import express from 'express';
import { authRoutes } from '../apis/authModule/auth.routes';
import { userRoutes } from '../apis/userModule/user.routes';
import authGuard from '../helpers/authGuard.helper';

const appRoutes = express.Router()

appRoutes.use("/auth", authRoutes);

appRoutes.use("/user", authGuard, userRoutes)

appRoutes.use("/*", (req, res) => { res.end("Looks like you lost") })

export { appRoutes }