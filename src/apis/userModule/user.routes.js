import express from "express";
import userController from "./user.controller";
import userService from "./user.service";

const userRoutes = express.Router();

userRoutes.get('/settings', userController.getSettings, userService.getSettings);

// userRoutes.post('/sign-in', userController.signIn);

module.exports = userRoutes 