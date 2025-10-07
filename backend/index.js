import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import scenarioRoutes from './routes/scenarioRoutes.js';
import simulateRoutes from './routes/simulateRoutes.js';

dotenv.config(); // ✅ Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/scenarios', scenarioRoutes);
app.use('/simulate', simulateRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(process.env.PORT || 5000, () => console.log("Server running"));
