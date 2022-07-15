import mongoose from "mongoose";

var refreshTokenSchema = mongoose.Schema(
  {
    token: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//because we use serverless functions
export default mongoose.models.RefreshToken ||
  mongoose.model("RefreshToken", refreshTokenSchema);
