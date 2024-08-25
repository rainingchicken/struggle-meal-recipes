import mongoose from "mongoose";
const Schema = mongoose.Schema;

const procedureSchema = new Schema({
  steps: {
    type: String,
    required: true,
  },
  recipe_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Recipe",
  },
});
const Procedure = mongoose.model("Procedure", procedureSchema);
export default Procedure;
