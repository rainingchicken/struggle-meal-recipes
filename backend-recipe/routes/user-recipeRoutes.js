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
import {
  getAllIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController.js";
import {
  getProcedure,
  createProcedure,
  updateProcedure,
} from "../controllers/proceduresController.js";

//recipes
router.get("/", protect, getAllRecipes);
router.get("/:_id", protect, getRecipe);
router.post("/", protect, createRecipe);
router.patch("/:_id", protect, updateRecipe);
router.delete("/:_id", protect, deleteRecipe);

//ingredients
router.get("/:_id/ingredients/", protect, getAllIngredients);
router.get("/:_id/ingredients/:ingredient_id", protect, getIngredient);
router.post("/:_id/ingredients", protect, createIngredient);
router.patch("/:_id/ingredients/:ingredient_id", protect, updateIngredient);
router.delete("/:_id/ingredients/:ingredient_id", protect, deleteIngredient);

//procedures

router.get(
  "/:_id/ingredients/:ingredient_id/procedures",
  protect,
  getProcedure
);
router.post(
  "/:_id/ingredients/:ingredient_id/procedures",
  protect,
  createProcedure
);
router.patch(
  "/:_id/ingredients/:ingredient_id/procedures/:procedures_id",
  protect,
  updateProcedure
);

export default router;
