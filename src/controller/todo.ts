import todoModel from "../model/Todo";
import mongoose from "mongoose";
import { Request, Response } from "express";
// @desc GET ALL USER TODO
// @route /api/todo/list/:id
export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  const todos = await todoModel.find({ user: id });
  res.status(200).json(todos);
};

// @desc INSERT TODO
// @route /api/todo/create
export const createTodo = async (req: Request, res: Response) => {
  const { todo, uid, isCompleted } = req.body;

  if (!todo) {
    return res.status(400).json({ msg: "This field is required!" });
  }

  if (!mongoose.Types.ObjectId.isValid(uid)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  const todoData = await todoModel.create({
    title: todo,
    user: uid,
    isCompleted: isCompleted,
  });

  return res.status(201).json({
    msg: "Todo added successfully!",
    data: todoData,
    isSuccess: true,
  });
};

// @desc EDIT TODO
// @route /api/todo/edit/:id
export const editTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid todo ID" });
  }

  const todo = await todoModel.findById(id);

  if (!todo) {
    return res.status(404).json({ msg: "Todo not found!" });
  }

  const updatedTodo = await todoModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
};

// @desc REMOVE TODO
// @route /api/todo/remove/:id
export const removeTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid todo ID" });
  }

  const todo = await todoModel.findByIdAndDelete(id);

  if (!todo) {
    return res.status(404).json({ msg: "Todo not found" });
  }

  res.status(200).json({ msg: "Todo removed successfully" });
};

// @desc UPDATE TODO STATUS
// @route /api/todo/update/:id
export const isDoneTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid todo ID" });
  }

  const todo = await todoModel.findById(id);

  if (!todo) {
    return res.status(404).json({ msg: "Todo not found!" });
  }

  const updatedTodo = await todoModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
};

// @desc CHECK REMAINING TODOS
// @route /api/todo/remaining/:id
export const checkRemainingTodos = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid user ID" });
  }

  const remainingTodosCount = await todoModel
    .find({
      user: id,
      isCompleted: false,
    })
    .countDocuments();

  res.status(200).json({ remainingTodos: remainingTodosCount });
};
