import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import { mongoConnect } from './config/mongoDB';


dotenv.config();
mongoConnect()

const app = express();
const port = process.env.PORT || 3000

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
