import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import router from "./routes/expensesRoutes.js";
import authRouter from "./routes/authRoutes.js";
import { requireAuth } from "./middleware/authenticateToken.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

app.use(express.json());
const port = process.env.PORT || 8080;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/auth", authRouter);
app.use("/expenses", requireAuth, router);

app.listen(port, () => {
  console.log(`Server is live on port ${port}`);
});
