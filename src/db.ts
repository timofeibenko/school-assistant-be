import mongoose from 'mongoose';

export const createDbConnection = async (): Promise<void> => {
	try {
		await mongoose.connect(process.env.MONGODB_ADDON_URI);
		console.log('Mongoose is connected');
	} catch (e) {
		console.log('Mongoose was unable to connect', e);
	}
  
	const dbConnection = mongoose.connection;
	dbConnection.on('error', (err) => console.log(`Connection error ${err}`));
	dbConnection.once('open', () => console.log('Connected to DB!'));
};