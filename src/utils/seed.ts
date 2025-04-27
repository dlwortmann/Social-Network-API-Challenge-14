import connection from "../config/connection.js"
import { User, Thought } from '../models/index.js'
import { users, thoughts } from '../utils/data.js'
import mongoose, {Document} from "mongoose"

interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    thoughts: mongoose.Types.ObjectId[]
}

connection.on('error', (err) => err)

connection.once('open', async () => {
    console.log('connected')
    try {
    await User.deleteMany({})
    await Thought.deleteMany({})
    console.log('old data deleted')

    const userDocs: UserDocument[] = await User.insertMany(users)
    console.log("users seeded")

    const userMap: { [key: string]: UserDocument } = {};
    userDocs.forEach(user => {
        userMap[user.username] = user
    })

    await Promise.all(thoughts.map(async (thought) => {
        const user = userMap[thought.username]
        if (!user) {
            console.error(`no user found for username: ${thought.username}`)
            return null
        }
        const createdThought = await Thought.create({
            text: thought.text,
            username: user.username
        })
        await User.findByIdAndUpdate(
            user._id,
            { $push: { thoughts: createdThought._id } },
            { new: true }
        )
        console.log("Thoughts seeded and linked to users.")
        return createdThought
        
    }));

    console.table(users)
} catch (error) {
    console.error("Error seeding data:", error)
} finally {
   process.exit(0)
}
}
)