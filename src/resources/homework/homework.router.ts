import { Router, Request, Response } from 'express';
import { validatePayload } from '../../middleware/validate-payload';
import { generateResponseBody } from '../../utils';
import { Homework, THomework, ZHomework } from './homework.schema';

const router = Router();

router.route('/homework').post(validatePayload(ZHomework), async(req: Request, res: Response) => {
	try {
		const homeworkRequest: THomework = req.body;
		const homework = new Homework(homeworkRequest);
		await homework.save();
		return res.status(201).json(generateResponseBody());
	} catch (e) {
		return res.status(500).json(generateResponseBody((e as Record<string, unknown>).toString()));
	}
});

router.route('/homework/:classCode').get(async(req: Request, res: Response) => {
	try {
		const { classCode } = req.params;
		
		if (!classCode) {
			return res.status(409).json(generateResponseBody('classCode request parameter is missing'));
		}
						
		const homework = await Homework.find({ classCode });	

		return res.status(200).json({
			...generateResponseBody(),
			homework,
		});
	} catch (e) {
		return res.status(500).json(generateResponseBody((e as Record<string, unknown>).toString()));
	}
});

export { router as homeworkRouter};
