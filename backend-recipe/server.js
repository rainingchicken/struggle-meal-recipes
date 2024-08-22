import express from "express";
import dotenv from "dotenv";
dotenv.config();
import conn from "./db/conn.js";

const port = process.env.PORT || 4000;

conn();

import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/recipes", recipeRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
