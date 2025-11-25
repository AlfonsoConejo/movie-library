import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { getDb } from "./db.js";

dotenv.config();

// Crear Access Token (JWT)
function createAccessToken(userId){
    return jwt.sign(
        { sub: userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
}

// Crear Refresh Token (opaco, string aleatorio)
function createRefreshToken(){
    return crypto.randomBytes(64).toString("hex");
}

const sendRefreshTokenToDB = async (userId, refreshToken) => {
    const db = getDb(); // obtiene la DB ya conectada
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 días

    //Insertamos el token en la base de datos del usario
    const result = await db.collection("refreshTokens").insertOne({
        userId,
        token: refreshToken,
        expiresAt
    });
}

export {createAccessToken, createRefreshToken, sendRefreshTokenToDB};