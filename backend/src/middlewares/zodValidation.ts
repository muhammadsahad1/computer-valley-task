import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validateResource = (schema: AnyZodObject): RequestHandler => {

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("req", req.body)
            // Validate the request body against the schema
            await schema.parseAsync(req.body);
            next(); // Proceed to the next middleware if validation is successful
        } catch (error) {
            if (error instanceof ZodError) {
                // If validation fails, return a JSON response with the validation errors
                res.status(400).json({
                    errors: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
            }
            next(error); // Pass any other errors to the next middleware (error handler)
        }
    };
};
