import { config } from "../../config/config";
import { client } from "../database"

const createDB = async () => {
     await client.connect();

     try {
        await client.query(`CREATE DATABASE "${config.db.database}"`);
        console.log(`Database "${config.db.database}" created success`);
     } catch (err) {
        if(err instanceof Error){
            console.error("Error creating database :", err.stack);
        }
     }finally{
        await client.end();
        console.log("Connection closed");
     }
}


createDB();