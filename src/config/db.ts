import mongoose from "mongoose";
export const URI: string =
  "mongodb+srv://neilAdmin:neilAdmin@neilcluster.el0nxzv.mongodb.net/todo-app?retryWrites=true&w=majority";

export const SECRET: string = "anonymous12345";
export const db = async (url: string) => {
  try {
    const connect = await mongoose.connect(url);
    console.log(`you're connected to the database ${connect.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
};
