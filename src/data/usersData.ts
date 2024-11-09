import { pool } from "../db/database";
import { Users, UsersParams, UsersSchema } from "../models/usersModel";


export class UsersData {

  async getUserByEmail(email:string): Promise<Users>{
    const consult = `SELECT * FROM users WHERE email = $1`;

     const result = await pool.query(consult, [email]);

     return result.rows[0];
  }

  async createUser(user:UsersParams){

   const query = `
    INSERT INTO users (name, email, password, age, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, password, age, role;
  `;
   const values = [user.name, user.email, user.password, user.age, user.role];
   const result = await pool.query(query, values);
   return result.rows[0];
      
   }

}


export const usersData = new  UsersData();