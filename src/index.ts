import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createDbConnection } from './db';

const app = express();
app.use(cors());
app.use(bodyParser.json());

createDbConnection();

app.listen(process.env.PORT, () => {
	console.log(`Express server has started on port ${process.env.PORT}`);
});

