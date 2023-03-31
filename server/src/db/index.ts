import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL as string;

const connectToDb = async () => {
	try {
		await mongoose.connect(DB_URL);
		console.log('Successfully connected to DB');
	} catch (error) {
		console.log(error);
	}
};

export { connectToDb };
