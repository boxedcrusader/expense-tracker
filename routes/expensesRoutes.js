import express from "express";
import login from "../authentication/login.js";
import signup from "../authentication/signup.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { deleteExpense, editExpense, getExpenses, setExpenses } from "../controllers/expensesController.js";

const expense = express.Router();
expense.use(express.json());

expense.get("/expenses/:id", authenticateToken, getExpenses);
expense.post("/add", authenticateToken, setExpenses);
expense.delete("/delete/:id", authenticateToken, deleteExpense);
expense.patch("/edit/:id", authenticateToken, editExpense);
expense.post("/login", login);
expense.post("/signup", signup);

export default expense;