import mongoose, { Document, Schema } from 'mongoose';
import { thirtyDaysFromNow } from '../../common/utils/date-time';

export interface SessionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  createdAt?: Date;
  expireAt?: Date;
}

const sessionSchema = new Schema<SessionDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true,
  },
  userAgent: { type: String, required: false },
  createdAt: { type: Date, required: false, default: Date.now },
  expireAt: { type: Date, required: false, default: thirtyDaysFromNow() },
});

const SessionModel = mongoose.model<SessionDocument>('Session', sessionSchema);

export default SessionModel;
