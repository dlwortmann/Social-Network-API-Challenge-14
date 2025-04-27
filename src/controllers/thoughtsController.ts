import { Thought, User } from '../models/index.js'
import { Request, Response } from 'express'

export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find()
        return res.json(thoughts)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId})

        if (!thought) {
           return res.status(404).json({ message: 'No thought match with that ID'})
        } else {
           return res.json(thought)
        }
    } catch (err) {
       return res.status(500).json(err)
    }
}

export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body)
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({ message: 'Thought created, but no user match with that ID'})
        } else {
            return res.status(201).json({ message: 'Thought created!' })
        }
    } catch (err) {
        console.log(err) 
       return res.status(500).json(err)
    }
}

export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
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
        const thought = await Thought.findOneAndDelete(
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

export const addReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        if (!reaction) {
            return res.status(404).json({ message: 'No matching thought with that ID' })
        } else {
            return res.status(200).json(reaction)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        if (!reaction) {
            return res.status(404).json({ message: 'No matching thought with that ID' })
        } else {
            return res.status(200).json(reaction)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}
