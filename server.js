import express from "express";
import dotenv from "dotenv";
import expense from "./routes/expensesRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(expense)

app.listen(port, () => {
    console.log(`Server is live on port ${port}`);
})