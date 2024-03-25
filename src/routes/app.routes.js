const express = require('express');
const authRoutes = require('../apis/authModule/auth.routes');
// const userRoutes = require('../apis/userModule/user.routes');
// const authGuard = require('../helpers/authGuard.helper');

const appRoutes = express.Router()

appRoutes.use("/auth", authRoutes);

// appRoutes.use("/user", authGuard, userRoutes)

// appRoutes.use("/*", (req, res) => { res.end("Looks like you lost") })

module.exports = appRoutes 