import { Document, Types } from "mongoose";
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: Types.ObjectId;
}

export interface ITodo extends Document {
  title: string;
  user: any;
  isCompleted: boolean;
  _id: Types.ObjectId;
}
