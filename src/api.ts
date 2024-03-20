import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import { appRoutes } from './routes/app.routes';

const serverless = require('serverless-http');

dotenv.config({ path: "local.env" });

const app = express();

app.use(express.json());

const dbUrl = process.env.DB_URL || '';
mongoose.connect(dbUrl)
    .then(() => {
        console.log('db connection success 👍.');
    }).catch((err) => {
        console.log(`db connection failed 🤨.`, err);
    })

// app.use("/api/v1", appRoutes);

app.use('/api/v1', appRoutes);

// app.use('/.netlify/functions/api', appRoutes);
module.exports.handler = serverless(app);
// const port = Number(process.env.SERVER_PORT || 8200);
// app.listen(port, () => {
//     console.log('server runnig at', port);
// })