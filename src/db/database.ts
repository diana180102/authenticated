import { configDotenv } from "dotenv";
import { config } from "../config/config";
import { Pool, Client } from "pg";

export const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.database,
    user: config.db.user,
    password: config.db.password,
});


export const client = new Client({
    host: config.db.host,
    port: config.db.port,
    database: "postgres",
    user: config.db.user,
    password: config.db.password,
});

//Conection to database
export const query = async ( text:string, params?: (string | boolean | number)[]) =>{
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.error("Error on conection to database : ", error);
        throw error;
    }
}


if(process.env["NODE_ENV"] === "test"){
    configDotenv({path:".env.test"});
}