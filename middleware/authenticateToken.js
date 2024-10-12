import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send("User has no access to perform this action");

    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).send("Token no longer valid");

        req.user = user;
        next();
    });
};
