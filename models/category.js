import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "category must have a name"],
    unique: true,
  },
  quizes: [mongoose.Schema.Types.ObjectId],
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
