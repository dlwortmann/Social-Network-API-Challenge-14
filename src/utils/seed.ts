import connection from "../config/connection.js"
import { User } from '../models/index.js'
import getRandomName from './data.js'

console.log(getRandomName())
connection.on('error', (err) => err)

connection.once('open', async () => {
    let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck?.length) {
        await connection.dropCollection('thoughts')
    }

    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray()
    if (userCheck?.length) {
        await connection.dropCollection('users')
    }

    const users = []

    for (let i = 0; i < 20; i++) {
        const fullName = getRandomName()
        const first = fullName.split(' ')[0]
        const last = fullName.split(' ')[1]

        users.push({
            first,
            last,
        })
    }

    await User.insertMany(users)
    console.log(users)
    process.exit(0)
})