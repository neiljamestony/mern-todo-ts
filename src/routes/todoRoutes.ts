import express from "express";
const router = express.Router();
import {
  getTodo,
  createTodo,
  editTodo,
  isDoneTodo,
  removeTodo,
  checkRemainingTodos,
} from "../controller/todo";

router.get("/list/:id", getTodo);
router.post("/create", createTodo);
router.put("/edit/:id", editTodo);
router.delete("/remove/:id", removeTodo);
router.put("/isCompleted/:id", isDoneTodo);
router.get("/remaining/:id", checkRemainingTodos);

export default router;
