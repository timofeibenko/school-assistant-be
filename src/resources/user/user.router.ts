import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { validatePayload } from '../../middleware/validate-payload';
import { generateResponseBody } from '../../utils';
import { TUserRequest, ZUserRequest, User } from './user.schema';

const router = Router();

// TODO: implement admin-only access to this endpoint
router.route('/user').post(validatePayload(ZUserRequest), async (req: Request, res: Response) => {
	try {
		const { password, ...rest }: TUserRequest = req.body;

		const userData = new User({
			passwordHash: bcrypt.hashSync(password, 10),
			...rest,
		});

		await userData.save();
		return res.status(201).json(generateResponseBody());
	} catch (e) {
		return res.status(500).json(generateResponseBody((e as Record<string, unknown>).toString()));
	}
});

export { router as userRouter };
