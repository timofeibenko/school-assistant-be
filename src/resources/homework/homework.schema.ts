import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

const ZHomework = z
	.object({
		classCode: z.string(),
		subject: z.literal('maths'),
		assignment: z.array(
			z.object({
				date: z.string().datetime(),
				paragraph: z.number(),
				exercise: z.number(),
				note: z.string().optional(),
			})
		)
	})
	.strict();

type THomework = z.infer<typeof ZHomework>;
type TAssignment = THomework['assignment'][number];

interface IHomeworkDocument extends Document, THomework {}
interface IAssignmentSubdocument extends Document, TAssignment {}

const assignmentSubschema = new Schema<IAssignmentSubdocument>({
	date: {
		required: true,
		type: String,
	},
	paragraph: {
		required: true,
		type: Number,
	},
	exercise: {
		required: true,
		type: Number,
	},
	note: {
		type: String,
	}
}, { bufferCommands: false, autoCreate: false });

const homeworkSchema = new Schema<IHomeworkDocument>({
	classCode: {
		required: true,
		type: String,
	},
	subject: {
		required: true,
		type: String,
	},
	assignment: {
		required: true,
		type: [assignmentSubschema],
	}
}, { bufferCommands: false, autoCreate: false });

const Homework = mongoose.model<IHomeworkDocument>('Homework', homeworkSchema);

export {
	Homework,
	ZHomework,
	THomework,	
	IHomeworkDocument,
};
