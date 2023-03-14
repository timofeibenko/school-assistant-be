import { User, TUser } from './user.schema';

export const addOne = async (user: TUser) => {
	return new User(user).save();
};

export const exists = async (key: keyof TUser) => {
	const exists = User.exists({ [key]: key});
};