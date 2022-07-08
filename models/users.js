import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  //   jwtToken: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//because we use serverless functions
export default mongoose.model.User || mongoose.model("User", userSchema);
