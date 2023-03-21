import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

const ZUserBase = z
	.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string(),
		userMetadata: z.union([
			z.object({
				role: z.literal('teacher'),
				assignedClassCode: z.string(),
			}),
			z.object({
				role: z.literal('student'),
				classCode: z.string(),
				assignedTeacher: z.string(),
			})
		])	
	})
	.strict();

const ZUserRequest = ZUserBase.extend({
	password: z.string(),
});

const ZUser = ZUserBase.extend({
	passwordHash: z.string(),
});

type TUser = z.infer<typeof ZUser>;
type TUserRequest = z.infer<typeof ZUserRequest>;

interface IUserDocument extends Document, TUser {}

const userSchema = new Schema<IUserDocument>({
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
			assignedTeacher: {
				type: String,
			}, 
			classCode: {
				type: String,
			}
		}
	}
}, { bufferCommands: false, autoCreate: false });

const User = mongoose.model<IUserDocument>('User', userSchema);

export {
	User,
	ZUserRequest,
	TUserRequest,
	TUser,
	IUserDocument,
};
