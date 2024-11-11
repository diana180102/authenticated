import multer from "multer";
import { ApiError } from "./error";
import path from "path";

// Configuración de Multer para almacenar los archivos temporalmente
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  path.resolve(__dirname, '/uploads')); // Carpeta temporal para almacenar el archivo
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Nombre único para cada archivo
    }
});

// Filtro para asegurar que solo se suban archivos CSV
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype !== "text/csv") {
        return cb(new ApiError("Only CSV files are allowed", 400));
    }
    cb(null, true);
};

export const upload = multer({ storage, fileFilter });
