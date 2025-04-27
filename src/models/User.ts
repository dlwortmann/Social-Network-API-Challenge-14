import { Schema, Document, model, Types } from 'mongoose';

//create user interface
interface IUser extends Document {
    _id: Types.ObjectId,
    username: string,
    email: string,
    thoughts: Types.ObjectId[],
    friends: Types.ObjectId[],
}

// build schema to create User Model
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        thoughts: [
            { //populated subdoc
            type: Schema.Types.ObjectId,
            ref: "thought"
        }
    ],
        friends: [
            { //populated subdoc
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

// virtural property 'friendcount' to be included
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

// Initialize User Model
const User = model('user', userSchema);

export default User;