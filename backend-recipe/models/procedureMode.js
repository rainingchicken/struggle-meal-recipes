import mongoose from "mongoose";
const Schema = mongoose.Schema;

const procedureSchema = new Schema({
  steps: {
    type: Number,
    required: true,
  },
});
const Procedure = mongoose.model("Procedure", procedureSchema);
export default Procedure;
