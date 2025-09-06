import express from "express";

const authRouter = express.Router();

// Signup route
authRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await req.supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    res.status(201).json({ message: "User created", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await req.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.status(200).json({
      message: "Login successful",
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: data.user,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default authRouter;
