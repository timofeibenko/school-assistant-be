import { Router, Request, Response  } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validatePayload } from '../../middleware/validate-payload';
import { generateResponseBody } from '../../utils';
import { User } from '../user/user.schema';
import { TAuthRequest, ZAuthRequest } from './auth.schema';

const router = Router();

router.route('/auth').post(validatePayload(ZAuthRequest), async (req: Request, res: Response) => {
	const { email, password }: TAuthRequest = req.body;

	const requestedUser = await User.findOne({ email });

	if (!requestedUser) {
		return res.status(404).json(generateResponseBody('User does not exist'));
	}

	const { passwordHash } = requestedUser;

	try {
		const isValidPassword = await bcrypt.compare(password, passwordHash);

		if (isValidPassword) {
			const accessToken = jwt.sign({
				email: requestedUser.email,
			}, 
			process.env.JWT_SECRET as string, {
				expiresIn: '9999 years'
			});

			const { _id, firstName, lastName, email, userMetadata } = requestedUser;

			return res.status(201).json({
				...generateResponseBody(),
				accessToken,
				user: {
					id: _id,
					firstName,
					lastName,
					email,
					userMetadata,
				},
			});
		}
	} catch (e) {
		return res.status(500).json(generateResponseBody(e));
	}
});

export { router as authRouter };
