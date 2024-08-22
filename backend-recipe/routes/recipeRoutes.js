import express from "express";
const router = express.Router();
import {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

router.get("/", getAllRecipes);
router.get("/:_id", getRecipe);
router.post("/", createRecipe);
router.patch("/:_id", updateRecipe);
router.delete("/:_id", deleteRecipe);

export default router;
