import pool from "../database/db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const passwordHash = user.user_password;
            const verifyPassword = await argon2.verify(passwordHash, password);

            if (verifyPassword) {
                // Creating the JWT token
                const accessToken = jwt.sign(
                    { email: user.email, id: user.user_id }, // Payload
                    process.env.SECRET_ACCESS_TOKEN, // Secret key from environment variables
                );

                return res.json({ accessToken });
            } else {
                return res.status(401).send("Invalid password");
            }
        } else {
            return res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
};

export default login;
