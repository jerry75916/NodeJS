import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Admin: Number,
    Editor: Number,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: String,
});
const mongooseUserSchema = mongoose.model("User", userSchema);

export default mongooseUserSchema;
