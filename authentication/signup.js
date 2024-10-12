import argon2 from "argon2";
import pool from "../database/db.js";

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHash = await argon2.hash(password);
        
        const result = await pool.query("INSERT INTO users (email, user_password) VALUES ($1, $2)", [email, passwordHash]);

        const newUser = result.rows[0];
        res.send("Account created: " + newUser);
    } catch (err) {
        console.error(err.message);
    }
}

export default signup;