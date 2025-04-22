import { Thoughts, User } from '../models/index.js'
import { Request, Response } from 'express'

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thoughts.find()
        res.json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOne({ _id: req.params.thoughtId})

        if (!thought) {
            res.status(404).json({ message: 'No thought match with that ID'})
        } else {
            res.json(thought)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.create(req.body)
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        )
        if (!user) {
            res.status(404).json({ message: 'Thought created, but no user match with that ID'})
        } else {
            res.json('Thought created!')
        }
    } catch (err) {
        console.log(err) 
        res.status(500).json(err)
    }
}