import { z } from 'zod';

const ZAuthRequest = z
	.object({
		email: z.string(),
		password: z.string(),
	})
	.strict();

type TAuthRequest = z.infer<typeof ZAuthRequest>

export {
	ZAuthRequest,
	TAuthRequest,
};