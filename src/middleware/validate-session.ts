import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { generateResponseBody } from '../utils';

export const validateSession = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!process.env.JWT_SECRET) {
			return res.status(500).json(generateResponseBody('Unhandled jwt exeption'));
		}

		const token = req.headers.authorization?.split(' ')[1];
		console.log(token);

		if (!token) { 
			return res.status(401).json(generateResponseBody('Not authorized')); 
		}

		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			if (decoded) {
				console.log(decoded);
				next();
			}

			if (err) { 
				return res.status(401).json(generateResponseBody(err));
			}
		});
	} catch (e) {
		return res.status(500).json(generateResponseBody(e));
	}
};