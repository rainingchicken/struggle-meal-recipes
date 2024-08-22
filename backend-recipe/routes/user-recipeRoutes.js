import express from "express";
const router = express.Router();
import {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/userRecipeController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/", protect, getAllRecipes);
router.get("/:_id", protect, getRecipe);
router.post("/", protect, createRecipe);
router.patch("/:_id", protect, updateRecipe);
router.delete("/:_id", protect, deleteRecipe);

export default router;
