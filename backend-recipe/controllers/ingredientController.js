import asyncHandler from "express-async-handler";
import Ingredient from "../models/ingredientModel.js";

// @desc    get all of user's ingredients
// @route   GET /api/ingredients
// @access  Private
const getAllIngredients = asyncHandler(async (req, res) => {
  // res.json({ message: "GET all user's ingredients" });
  const recipe_id = req.params;

  try {
    const allIngredients = await Ingredient.find({ recipe_id });
    res.status(200).json(allIngredients);
  } catch (error) {
    res.status(404).json({ error: `Something went wrong ${error.message}` });
  }
});

// @desc    get a ingredient
// @route   GET /api/ingredients/:_id
// @access  Public
const getIngredient = asyncHandler(async (req, res) => {
  //   res.json({ message: "GET this ingredient" });
  const ingredient_id = req.params.ingredient_id;

  try {
    const thisIngredient = await Ingredient.findById(ingredient_id);
    res.status(200).json(thisIngredient);
  } catch (error) {
    res.status(404).json({ error: `Ingredient not found ${error.message}` });
  }
});

// @desc   create a workout with user's _id
// @route   POST /api/ingredients
// @access  Private
const createIngredient = asyncHandler(async (req, res) => {
  //   res.json({ message: "POST new ingredient" });
  const { amount, unit, ingredient } = req.body;
  const recipe_id = req.params;
  try {
    const newIngredient = await Ingredient.create({
      amount,
      unit,
      ingredient,
      recipe_id,
    });
    res.status(200).json(newIngredient);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc    update a ingredient
// @route   PATCH /api/ingredients/_:id
// @access  Private
const updateIngredient = asyncHandler(async (req, res) => {
  //   res.json({ message: "PATCH this workout" });
  const _id = req.params.ingredient_id;
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(_id, req.body);
    res.status(200).json(updatedIngredient);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc   delete ingredient
// @route   DELETE /api/ingredients/:_id
// @access  Private
const deleteIngredient = asyncHandler(async (req, res) => {
  //   res.json({ message: "DELETE this workout" });
  const _id = req.params.ingredient_id;
  try {
    const deletedIngredient = await Ingredient.findByIdAndDelete(_id);
    res.status(200).json(deletedIngredient);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export {
  getAllIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
