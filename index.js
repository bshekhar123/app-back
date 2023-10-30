const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const CONFIG = require('./src/config');
app.use(cors());
// const corsOptions = {
//     origin: '*',
//     methods: 'OPTIONS,GET,PUT,POST,PATCH,DELETE',
//     allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
// };
const router = require('./src/routes/authRoutes');
const router1 = require('./src/routes/sareeRoutes');
const router2 = require('./src/routes/customerRoutes');
const router3 = require('./src/routes/cartRoutes');

app.use(express.json());

app.use('/api/auth', router);
app.use('/api', router1);
app.use('/api', router2);
app.use('/api', router3);

const connectToDB = async () => {
    try {
        await mongoose.connect(`${CONFIG.DB_URL}`);
        console.log("DB connected")
    } catch (err) {
        console.log(err);
    }
};
connectToDB();

app.listen(CONFIG.PORT, () => {
    console.log("server is on", CONFIG.PORT)
})