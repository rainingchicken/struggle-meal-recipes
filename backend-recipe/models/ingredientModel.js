import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
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
  recipe_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Recipe",
  },
});
const Ingredient = mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;
