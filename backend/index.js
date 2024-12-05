import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userStorage from './routes/userstorage.routes.js';


dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('DB is connected');
}).catch((err)=>{
    console.log(err);
});

const app = express();

app.listen(3001, () => {
    console.log('Server is running on port 3001!!!');
    }
);

app.use(express.json());
app.use(cors());


app.use('/userstorage', userStorage);