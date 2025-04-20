import { Schema, ObjectId, Document, Types, model } from 'mongoose';
import formatDate from "../utils/Date.js"

interface IReaction extends Document {
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
            get: (date) => formatDate(date)
        },
        username: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const Reaction = model('Reaction', reactionSchema)

export default Reaction;
