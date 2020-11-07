import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    hash: string;
    salt: string;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: [ true, 'the username was not informed'],
        unique: [true, 'the username is already in use'],
        maxLength: [20, 'the username cannot be longer than 20 characters'],
        minlength: [4, 'the username must be longer than 3 characters'],
    },
    email: {
        type: String,
        required: [ true, 'the email was not informed'],
        unique: [true, 'the email is already in use'],
        maxLength: [50, 'the username cannot be longer than 50 characters'],
        minlength: [4, 'the email must be longer than 3 characters'],
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
