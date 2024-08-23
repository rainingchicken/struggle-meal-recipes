import express from "express";
import dotenv from "dotenv";
dotenv.config();
import conn from "./db/conn.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 4000;

conn();

import userRecipeRoutes from "./routes/user-recipeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/recipes", userRecipeRoutes);
app.use("/api/struggle-meals", recipeRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
