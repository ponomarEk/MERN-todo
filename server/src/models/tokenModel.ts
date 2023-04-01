import { model, Schema } from 'mongoose';

import { ITokens } from '../shared/types/Tokens';

const TokenSchema = new Schema<ITokens>({
	userId: {
		type: String,
		required: true,
		index: true,
	},
	refreshToken: { type: String, required: true },
});

const TokenModel = model<ITokens>('Token', TokenSchema);
export default TokenModel;
