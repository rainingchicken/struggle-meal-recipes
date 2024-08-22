import express from "express";
const router = express.Router();
import { getAllRecipes } from "../controllers/recipeController.js";

router.get("/", getAllRecipes);
router.get("/:id", getAllRecipes);

export default router;
