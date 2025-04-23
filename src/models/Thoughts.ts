import { Schema, Document, model, Types } from 'mongoose'
import reactionSchema, { IReaction } from "./Reaction.js"

interface IThought extends Document {
    text: string,
    createdAt: Date,
    username: string,
    reactions: Types.DocumentArray<IReaction>
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
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            // getters: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtSchema);

export default Thoughts;