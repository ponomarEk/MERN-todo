import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Application } from 'express';
dotenv.config();

import { connectToDb } from './db';
import { errorHandler } from './middlewares/errorMiddleware';
import router from './router';

const PORT = process.env.PORT || '9000';

const app: Application = express();

app.use(cookieParser()); // allow to get parsed cookies
app.use(
	cors({
		credentials: true,
	})
); // enable CORS
app.use(express.json()); // enable understanding of JSON
app.use('/api', router); // connect express routing
app.use(errorHandler); // connect error middleware

const startServer = async () => {
	try {
		await connectToDb();
		app.listen(PORT, () => {
			console.log(`Server started on PORT: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
