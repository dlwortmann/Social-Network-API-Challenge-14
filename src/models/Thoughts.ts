import { Schema, Document, ObjectId, model } from 'mongoose'
import Reaction from "./Reaction.js"
import formatDate from "../utils/Date.js"

interface IThought extends Document {
    text: string,
    createdAt: Date,
    username: string,
    reactions: typeof Reaction
}

const thoughtSchema = new Schema<IThought>(
    {
        text: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 300,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtSchema);

export default Thoughts;