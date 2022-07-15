import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//because we use serverless functions
export default mongoose.models.User || mongoose.model("User", userSchema);
