import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
      type: String,
      default: "notvegan",
    },
    ingredients: {
      type: Schema.Types.ObjectId,

      ref: "Ingredient",
    },
    procedures: {
      type: Schema.Types.ObjectId,

      ref: "Procedures",
    },

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
