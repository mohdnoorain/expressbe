const express = require("express");
const authController = require("./auth.controller");
const authService = require("./auth.service");

const authRoutes = express.Router();

authRoutes.post('/sign-up', authController.signUp, authService.signUp);

authRoutes.post('/sign-in', authController.signIn);

module.exports = authRoutes 