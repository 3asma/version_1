import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from './config/prisma.js';
import authRoutes from './routes/authRoutes.js';
import prospectRoutes from './routes/prospectRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import formationRoutes from './routes/formationRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import inscriptionRoutes from './routes/inscriptionRoutes.js';
import learningGroupRoutes from './routes/learningGroupRoutes.js';
import commercialRoutes from './routes/commercialRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import cancelRequestRoutes from './routes/cancelRequestRoutes.js';
import planningRoutes from './routes/planningRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('dev'));

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/prospects', prospectRoutes);
app.use('/candidates', candidateRoutes);
app.use('/formations', formationRoutes);
app.use('/rooms', roomRoutes);
app.use('/professors', professorRoutes);
app.use('/inscriptions', inscriptionRoutes);
app.use('/learning-groups', learningGroupRoutes);
app.use('/commercials', commercialRoutes);
app.use('/reservations', reservationRoutes);
app.use('/cancel-requests', cancelRequestRoutes);
app.use('/planning', planningRoutes);
app.use('/payments', paymentRoutes);
app.use('/attendances', attendanceRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);

// Health check endpoint (Public)
app.get('/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            database: 'Connected',
            uptime: process.uptime()
        });
    } catch (error) {
        res.status(503).json({
            status: 'Error',
            timestamp: new Date().toISOString(),
            database: 'Disconnected',
            error: error.message
        });
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: 'error',
        error: err.message || 'Internal Server Error'
    });
});

export default app;
