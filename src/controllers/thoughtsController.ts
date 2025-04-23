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

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        if (!thought) {
            return res.status(404).json({ message: 'No matching thought with that ID' })
        } else {
            return res.status(200).json(thought)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thoughts.findOneAndDelete(
            { _id: req.params.thoughtId }
        )
        if (!thought) {
            return res.status(404).json({ message: 'No matching thought with that ID' })
        } else {
            return res.status(200).json({ message: 'Thought deleted successfully' })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}