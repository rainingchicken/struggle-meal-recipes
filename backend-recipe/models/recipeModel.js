import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  ingredient: {
    type: String,
    required: true,
  },
});

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
      },
    ],
    servings: {
      type: Number,
      required: true,
    },
    vegan: {
      type: Boolean,
    },
    ingredients: [ingredientsSchema],
    procedures: [
      {
        type: String,
        required: true,
      },
    ],
    desperation: {
      type: Number,
      required: true,
    },
    health: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
