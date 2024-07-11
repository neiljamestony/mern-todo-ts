import { Schema, model } from "mongoose";
import { ITodo } from "../interface/main";

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "This field is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = model<ITodo>("Todo", todoSchema);

export default TodoModel;
