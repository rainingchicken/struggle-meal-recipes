import path from "path";
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

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend-recipe/dist")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "frontend-recipe", "dist", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
