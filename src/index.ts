import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import { appRoutes } from './routes/app.routes';

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

app.get('/', (req, res) => { res.send("Hlo ther !") })
app.use('/api/v1', appRoutes);

const port = Number(process.env.SERVER_PORT || 8200);
app.listen(port, () => {
    console.log(`server runnig atd http://localhost:${port}`);
})