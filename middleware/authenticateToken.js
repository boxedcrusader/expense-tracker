export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({error: "No authorization header"});
        }

        const token = authHeader.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({error: "No token provided."})
        }

        const {data, error } = await req.supabase.auth.getUser(token);

        if (error) {
            console.log("Auth error:", error)
            return res.status(401).json({error: "Invalid token passed."})
        }

        const user = data?.user;
        if (!user) {
            return res.status(401).json({error: "User not found"})
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(500).json({error: "Authentication failed"});
        console.log("Middleware error:", err);
    }
}