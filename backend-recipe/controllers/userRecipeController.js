import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

// @desc    get all of user's recipes
// @route   GET /api/recipes
// @access  Private
const getAllRecipes = asyncHandler(async (req, res) => {
  // res.json({ message: "GET all user's recipes" });
  const user = req.user.id;
  try {
    const allRecipes = await Recipe.find({ user }).sort({ createdAt: -1 });
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

// @desc   create a workout with user's _id
// @route   POST /api/recipes
// @access  Private
const createRecipe = asyncHandler(async (req, res) => {
  //   res.json({ message: "POST new recipe" });
  const user = req.user.id;
  const {
    title,
    categories,
    servings,
    vegan,
    procedures,
    desperation,
    health,
  } = req.body;

  try {
    const newRecipe = await Recipe.create({
      title,
      categories,
      servings,
      vegan,
      procedures,
      desperation,
      health,
      user,
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc    update a recipe
// @route   PATCH /api/recipes/_:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  //   res.json({ message: "PATCH this workout" });
  const _id = req.params;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(_id, req.body);
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc   delete recipe
// @route   DELETE /api/recipes/:_id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
  //   res.json({ message: "DELETE this workout" });
  const _id = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(_id);
    res.status(200).json(deletedRecipe);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export { getAllRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe };
