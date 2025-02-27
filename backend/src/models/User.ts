import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  location:  [number, number];
}


// Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: [Number], required: true }
});


export default mongoose.model<IUser>('User', userSchema);
