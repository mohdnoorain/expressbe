const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const userModal = require('./models/user.model');
// const appRoutes = require('./routes/app.routes.js');

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
app.get('/hi', (req, res) => { res.send("Hii user  ther !") })
app.get('/get', async (req, res) => {
    const resd = await userModal.find({ fullName: 'user1' })
    res.send(resd)
})
// app.use('/api/v1', appRoutes);

const port = Number(process.env.SERVER_PORT || 8200);
app.listen(port, () => {
    console.log(`server runnig atd http://localhost:${port}`);
})