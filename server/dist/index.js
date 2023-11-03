import express from 'express';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './route/userRoute.js';
import adminRoute from './route/adminRoute.js';
import partnerRoute from './route/partnerRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import generalRoute from './route/generalRoute.js';
import paymentRoute from './route/paymentRoute.js';
import appointmentRoute from './route/appointmentRoute.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 8000;
const MongoDB_Connection_String = process.env.DB_URL;
async function connectToMongoDB(connectionString) {
    await mongoose.connect(connectionString);
    console.log('Connected to DB');
}
try {
    await connectToMongoDB(MongoDB_Connection_String);
}
catch (e) {
    console.log('Error connecting to DB: ', e);
}
const app = express();
// app.use(express.json());
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ credentials: true, origin: ['https://www.pet-nest.shop', 'http://localhost:5173'] }));
app.use(cookieParser());
app.use('/api', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/partner', partnerRoute);
app.use('/api/general', generalRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/appointment', appointmentRoute);
// app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.get('/', (req, res) => {
    res.json("Server is running");
});
app.use(express.static(path.join(__dirname, ('../dist/public'))));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
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
//# sourceMappingURL=index.js.map