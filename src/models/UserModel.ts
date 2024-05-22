import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  favorites: [{ type: Number }],
  default: [],
});
const User = models.User || model("User", userSchema);
export default User;
