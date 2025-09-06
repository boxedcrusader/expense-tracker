import express from "express";

const router = express.Router();

//Get expenses
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { data: expenses, error: expenseError } = await req.supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId);

    if (expenseError)
      throw new Error(`Failed to fetch expenses: ${expenseError.message}`);

    res.status(200).json({
      message: "Success gotten all expenses",
      data: expenses,
      count: expenses.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Add an expense
router.post("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, expenseDate } = req.body;

    if (!amount || !expenseDate) {
      return res
        .status(400)
        .json({ error: "amount and expenseDate are required" });
    }

    const { data, error } = await req.supabase.from("expenses").insert({
      amount: amount,
      expense_date: expenseDate,
      user_id: userId,
    });

    if (error) throw error;

    res.status(201).json({ message: "Expense added", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//edit an expense
router.patch("/:id", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "amount is required" });
    }

    const { error: updateError } = await req.supabase
      .from("expenses")
      .update({
        amount: amount,
      })
      .eq("id", req.params.id);

    if (updateError) throw updateError;
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const { data, error: deleteError } = await req.supabase
      .from("expenses")
      .delete()
      .eq("id", req.params.id);

    if (deleteError) throw deleteError;

    res.status(200).json({ message: "Expense deleted", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
