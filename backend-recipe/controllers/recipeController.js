import asyncHandler from "express-async-handler";
import Recipe from "../models/recipeModel.js";

// @desc    get all of user's recipes
// @route   GET /api/recipes
// @access  Private
const getAllRecipes = asyncHandler(async (req, res) => {
  // res.json({ message: "GET all user's recipes" });
  // const query = req.query;
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const sortDirection = req.body.order === "asc" ? 1 : -1;
  try {
    const allRecipes = await Recipe.find({
      ...(req.query.vegan && { vegan: req.query.vegan }),
      ...(req.query.health && { vegan: req.query.health }),
      ...(req.query.servings && { vegan: req.query.servings }),
      ...(req.query.categories && { vegan: req.query.categories }),
      ...(req.query.desperation && { vegan: req.query.desperation }),
      ...(req.query._id && { _id: req.query._id }),
      ...(req.query.searchTerm && {
        $or: [
          { title: new RegExp(req.query.searchTerm, "i") },
          // { ingredients: new RegExp(req.query.searchTerm, "i") },
          // { procedures: new RegExp(req.query.searchTerm, "i") },
        ],
      }),
    })
      .sort({ updateAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

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
