import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';



function formatZodErrors(error: ZodError) {
    if (error.errors) {
      return error.errors.reduce((acc: Record<string, string>, err: any) => {
        acc[err.path.join(".")] = err.message;
        return acc;
      }, {});
    }
    return { message: " "+ error };
  }




export function validationHandler<T>(schema:ZodSchema<T>) {
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const validatedData = schema.parse(req.body);
            req.body = validatedData;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Validation Error',
                        details: formatZodErrors(error)
                    }
                });
            } else {
                next(error);
            }
        }
    };
}
