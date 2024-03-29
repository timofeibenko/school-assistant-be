import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createDbConnection } from './db';
import { userRouter } from './resources/user/user.router';
import { authRouter } from './resources/auth/auth.router';
import { homeworkRouter } from './resources/homework/homework.router';
import { validateSession } from './middleware/validate-session';

const BASE_API_URL = '/api';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

createDbConnection().then(() => {
	app.use(BASE_API_URL, authRouter);
	app.use(BASE_API_URL, validateSession);
	app.use(BASE_API_URL, userRouter);
	app.use(BASE_API_URL, homeworkRouter);

	const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080; 

	app.listen(PORT, '0.0.0.0', () => {
		console.log(`Express server has started on port ${process.env.PORT}`);
	});
});
