import express from 'express'
import 'dotenv/config';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import cors from 'cors'
import userRoute from './route/userRoute.js';
import adminRoute from './route/adminRoute.js';
import vetRoute from './route/VetRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 8000;
const MongoDB_Connection_String: string = process.env.DB_URL

async function connectToMongoDB(connectionString: string) {
    await mongoose.connect(connectionString);
    console.log('Connected to DB'); 
}

try{
    await connectToMongoDB(MongoDB_Connection_String)
} catch(e) {
    console.log('Error connecting to DB: ', e);
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({credentials: true, origin:'http://localhost:5173'}));
app.use(cookieParser());

app.use('/api', userRoute)
app.use('/api/admin',adminRoute)
app.use('/api/vet',vetRoute)


app.use(express.static(path.join(__dirname,('../dist/public'))));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


// app.use((error: unknown,
//     req: Request,
//     res: Response,
//     next: NextFunction) => {
//         console.error(error)
//         let errorMessage = "An unknown error occured";
//         let statusCode = 500;
//         if(isHttpError(error)) {
//             statusCode = error.status;
//             errorMessage = error.message; 
//         }
//         res.status(statusCode).json({ error: errorMessage })
//     })

















