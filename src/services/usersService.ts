import { ZodError } from "zod";
import { config } from "../config/config";
import { usersData } from "../data/usersData";
import { ApiError } from "../middleware/error";
import { UsersSchema, UsersParams,  } from "../models/usersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import fs from "fs";
import Papa from 'papaparse';


interface CSVRecord {
  name: string;
  email: string;
  age: number;  // O 'number', dependiendo de cómo se espera en tu CSV
  // Otros campos, si es necesario
}

interface ProcessResult {
  //Array object for success process of register
  success: Array<Omit<UsersParams, 'password'> & { id: number }>;
  //Array object for failed of register with details
  errors: Array<{ row: number; details: Record<string, string> }>;
}

// Función para leer el archivo CSV usando promesas


export class UsersService {
    
    async createUser(filePath:string): Promise<ProcessResult>{
         
        const results: ProcessResult = { success: [], errors: [] };
        
         try {

            // Leer el archivo CSV
            const fileContent = await fs.promises.readFile(filePath, "utf-8");
            console.log("fileContent",fileContent);

            // Parsear el CSV
            const parsedData = await Papa.parse(fileContent,{
              header:false,
              skipEmptyLines: true, // Can jump fields empty
              dynamicTyping: true,
            
            });

            

            console.log("parsedData"+ parsedData);

            // Si el parseo falla, lanzamos un error
            if (parsedData.errors.length > 0) {
                throw new ApiError("CSV parsing error", 400);
            }
             
           

            // Procesar los registros
            for (const [index, user]  of parsedData.data.entries() as unknown as [number, any] ) {
               
                try {

                    const mappedUser:CSVRecord = {
                        name: user[0] as string,
                        email: user[1] as string, 
                        age: user[2] as number, 
                        
                      };

                    // Validar los datos del usuario con Zod
                    const validatedUser = UsersSchema.parse(mappedUser);

                    // Verificar si el usuario ya existe
                    const existingUser = await usersData.getUserByEmail(validatedUser.email);
                    if (existingUser) {
                        results.errors.push({ row: index + 1, details: { error: "User already exists" } });
                        continue;
                    }

                    // Encriptar la contraseña si es necesario
                    const hashedPassword = await bcrypt.hash("codeable", 10);
                    const userToCreate = { ...validatedUser, password: hashedPassword };
                    console.log(userToCreate);

                    // Crear el usuario en la base de datos
                    const createdUser = await usersData.createUser(userToCreate);
                    results.success.push({ ...createdUser, password: undefined }); 

                } catch (error) {
                  
                    if (error instanceof ApiError) {
                        results.errors.push({ row: index + 1, details: { error: error.message } });
                    } else {
                        results.errors.push({ row: index + 1, details: { error: "Unknown error" } });
                    }
                }
            }
        } catch (error) {
            throw new ApiError("File processing failed", 500);
        }

        return results;
     
      

    }

    async loginUser(email:string, password:string){
        const user = await usersData.getUserByEmail(email);

        if(!user){
            throw new ApiError("User not found", 404);
        }

        const pass = await bcrypt.compare(password, user.password);

        if(!pass){
           throw new ApiError("Invalid credentials", 401); 
        }
        
        //send data to Token
        const dataToken = jwt.sign(
            {
                email: user.email,
                role: user.role
            }, 
             config.secret.key,
             { expiresIn: "1h" }
        );

        return dataToken;
    }
}

export const usersService = new UsersService();