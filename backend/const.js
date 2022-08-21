import dotenv from "dotenv";
dotenv.config();

export const url = process.env.DB_URL;
export const port = process.env.PORT;
export const jwtSecretKey = process.env.JWT_SECRET_KEY;
