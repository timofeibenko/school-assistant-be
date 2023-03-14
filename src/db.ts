import mongoose from 'mongoose';
import { User } from './resources/user/user.schema';

export const createDbConnection = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGODB_ADDON_URI as string);
		await User.createCollection();
		console.log('Connected to the database');
	} catch (e) {
		console.log('Database connection error:', e);
	}
};
