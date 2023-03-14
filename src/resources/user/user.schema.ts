import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

const ZUserBase = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	userMetadata: z.union([
		z.object({
			type: z.literal('teacher'),
			assignedClassCode: z.string(),
		}),
		z.object({
			type: z.literal('student'),
			classCode: z.string(),
			assignedTeacher: z.string(),
		})
	])	
});

const ZUserRequest = ZUserBase.extend({
	password: z.string(),
});

const ZUser = ZUserBase.extend({
	passwordHash: z.string(),
});

type TUser = z.infer<typeof ZUser>;
type TUserRequest = z.infer<typeof ZUserRequest>;

const userSchema = new Schema({
	firstName: {
		required: true,
		type: String,
	},
	lastName: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		unique: true,
		type: String,
	},
	passwordHash: {
		required: true,
		type: String,
	},
	userMetadata: {
		required: true,
		type: {
			role: {
				type: String,
			},
			assignedClassCode: {
				type: String,
			},
			classHead: {
				type: String,
			}, 
			classCode: {
				type: String,
			}
		}
	}
}, { bufferCommands: false, autoCreate: false });

const User = mongoose.model('User', userSchema);

export {
	User,
	ZUserRequest,
	TUserRequest,
	TUser,
};
