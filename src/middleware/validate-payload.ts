import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { generateResponseBody } from '../utils';

export const validatePayload = (zodSchema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
	const schemaValidation = zodSchema.safeParse(req.body);

	if (!schemaValidation.success) {
		return res.status(409).json(generateResponseBody(schemaValidation.error));
	}

	next();
};