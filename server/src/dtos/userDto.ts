import { HydratedDocument, Types } from 'mongoose';

import { IUser } from '../shared/types/User';

class UserDto {
	id: Types.ObjectId;
	email: string;
	isActivated: boolean;
	
	constructor(userModel: HydratedDocument<IUser>) {
		this.id = userModel._id;
		this.email = userModel.email;
		this.isActivated = userModel.isActivated;
	}
}

export default UserDto;
