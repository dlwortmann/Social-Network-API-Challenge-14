import { Schema, ObjectId, Document, Types } from 'mongoose';
//import formatDate from "../utils/Date.js"

export interface IReaction extends Document {
    reactionId: ObjectId,
    reactionBody: String,
    createdAt: Date,
    username: String,
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        }
    },
    // {
    //     toJSON: {
    //         getters: true
    //     }
    // }
);


export default reactionSchema;
