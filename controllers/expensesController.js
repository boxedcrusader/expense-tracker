import pool from "../database/db.js";

export const getExpenses = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await pool.query("SELECT * FROM expenses WHERE user_id = $1 RETURNING *", [userId]);
        res.json(result.rows);
    } catch (err) {
        console.log(err)
    }
};

export const setExpenses = async (req, res) => {
    try {
        const { amount, expenseDate } = req.body;
        const result = await pool.query("INSERT INTO expenses (amount, expense_date) VALUES ($1, $2)", [amount, expenseDate]);
        res.json(result);
    } catch (err) {
        console.log(err);
    }
};

export const editExpense = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { amount } = req.body;
        const result = await pool.query("UPDATE todolist SET amount = $1 WHERE user_id = $2", [amount, id]);
        const updatedExpense = result.rows[0];
        res.send(updatedExpense);
    } catch (err) {
        console.log(err)
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
        res.send(`Expense of id ${id} has been deleted`);        
    } catch (err) {
        console.log(err)
    }
}