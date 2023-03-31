import { model, Schema } from 'mongoose';

import { IUser } from '../shared/types/User';

const UserSchema = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		isActivated: {
			type: Boolean,
			default: false,
		},
		activationLink: {
			type: String,
		},
		//TODO
		// pathToAvatar: {
		// 	type: String,
		// },
	},
	{
		timestamps: true,
	}
);

const UserModel = model<IUser>('User', UserSchema);
export default UserModel;
