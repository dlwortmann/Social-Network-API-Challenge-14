import connection from "../config/connection.js"
import { User } from '../models/index.js'

connection.on('error', (err) => err)

connection.once('open', async () => {
    console.log('connected')
    await User.deleteMany({})
    await User.collection.insertMany(users)

    console.table(users)
    console.info('Seeding completed!')

    process.exit(0)
})