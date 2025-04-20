import { Schema, Document, model, ObjectId } from 'mongoose';

//create user interface
interface IUser extends Document {
    username: string,
    email: string,
    thoughts: ObjectId[],
    friends: ObjectId[],
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
            ref: "Thoughts"
        }
    ],
        friends: [
            { //populated subdoc
            type: Schema.Types.ObjectId,
            ref: "User"
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
const User = model('User', userSchema);

export default User;