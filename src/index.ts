import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from './authRoutes/routes'



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/auth', authRoutes)



app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
