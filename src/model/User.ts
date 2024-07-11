import { Schema, model } from "mongoose";
import { IUser } from "../interface/main";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "This field is required"],
    },
    lastName: {
      type: String,
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
    },
    password: {
      type: String,
      required: [true, "This field is required"],
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = model<IUser>("User", userSchema);

export default UserModel;
