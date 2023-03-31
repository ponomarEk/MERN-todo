import { model, Schema } from 'mongoose';

import { ITokens } from '../shared/types/Tokens';

const TokenSchema = new Schema<ITokens>({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	refreshToken: { type: String, required: true },
});

const TokenModel = model<ITokens>('Token', TokenSchema);
export default TokenModel;
