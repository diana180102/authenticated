import { config } from "../../config/config";

import { client } from "../database";

client.connect();

client.query(`DROP DATABASE IF EXISTS "${config.db.database}"`, (err) =>{
    if(err){
        console.error(`Error deleting database`, err.stack);
    }else{
        console.log(`Database "${config.db.database} created success"`);
    }
    client.end();
});