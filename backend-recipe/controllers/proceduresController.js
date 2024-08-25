import asyncHandler from "express-async-handler";
import Procedure from "../models/procedureMode.js";

// @desc    get the precedures of the specific recipe
// @route   GET /api/recipies/:id/ingredient/:ingredient_id/procedures/:procedures_id
// @access  Public
const getProcedure = asyncHandler(async (req, res) => {
  const procedures_id = req.params.procedures_id;

  try {
    const thisProcedure = await Procedure.findById(procedures_id);
    res.status(200).json(thisProcedure);
  } catch (error) {
    res.status(404).json({ error: `Procedure not found ${error.message}` });
  }
});

// @desc   create a workout with user's _id
// @route   POST /api/recipies/:id/ingredient/:ingredient_id/procedures
// @access  Private
const createProcedure = asyncHandler(async (req, res) => {
  const { steps } = req.body;
  const recipe_id = req.params;
  try {
    const newProcedure = await Procedure.create({
      steps,
      recipe_id,
    });
    res.status(200).json(newProcedure);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// @desc    update the procedures
// @route   PATCH /api/recipies/:id/ingredient/:ingredient_id/procedures/:procedures_id
// @access  Private
const updateProcedure = asyncHandler(async (req, res) => {
  const _id = req.params.procedures_id;
  try {
    const updatedProcedure = await Procedure.findByIdAndUpdate(_id, req.body);
    res.status(200).json(updatedProcedure);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export { getProcedure, createProcedure, updateProcedure };
