import jwt from "jsonwebtoken";

export function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Guardamos la info del user para que las rutas la usen
        req.user = decoded;

        next();
    } catch(error){
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};