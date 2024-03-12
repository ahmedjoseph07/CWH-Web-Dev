import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/todoapp.todo', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Database error:', error);
});

db.once('open', () => {
    console.log('Connected to DB');
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
