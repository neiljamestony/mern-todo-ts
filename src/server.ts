import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./config/db";
import userRoutes from "./routes/userRoutes";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI: any = process.env.MONGO_URI;

db(MONGO_URI);
app.use(
  cors({
    origin: ["https://mern-todo-fe.vercel.app", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
