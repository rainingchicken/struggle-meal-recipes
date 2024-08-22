import mongoose from "mongoose";

const conn = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    mongoose.connection.once("open", () => {
      console.log(`Connected to mongodb`);
    });
  } catch (error) {
    console.error(
      `Something went wrong with connect to the database ${err.message}`
    );
  }
};

export default conn;
