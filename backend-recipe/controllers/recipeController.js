import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

// @desc    get all of user's recipes
// @route   GET /api/recipes
// @access  Private
const getAllRecipes = asyncHandler(async (req, res) => {
  // res.json({ message: "GET all user's recipes" });

  try {
    const allRecipes = await Recipe.find({}).sort({ createdAt: -1 });
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(404).json({ error: `Something went wrong ${error.message}` });
  }
});

// @desc    get a recipe
// @route   GET /api/recipes/:_id
// @access  Public
const getRecipe = asyncHandler(async (req, res) => {
  //   res.json({ message: "GET this recipe" });
  const _id = req.params;
  try {
    const thisRecipe = await Recipe.findById(_id);
    res.status(200).json(thisRecipe);
  } catch (error) {
    res.status(404).json({ error: `Recipe not found ${error.message}` });
  }
});

export { getAllRecipes, getRecipe };
