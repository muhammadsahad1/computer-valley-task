import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import { mongoConnect } from './config/mongoDB';
import authRoute from './routes/authRoutes';


dotenv.config();
mongoConnect()

const app = express();
const port = process.env.PORT || 3000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
    console.log(" method", req.method)
    console.log("body", req.body)
    next()
})

app.use('/api/auth', authRoute)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
