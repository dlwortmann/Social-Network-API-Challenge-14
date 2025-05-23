import Thought from '../models/Thoughts.js';
import User from '../models/User.js'
import { Request, Response } from 'express'

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate({ path: 'thoughts', select: "-__v" })
            .populate({ path: 'friends', select: '-__v' })
        return res.json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body)
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })

        if (!user) {
            return res.status(404).json({ message: 'No user match with that ID' })
        } else {
            return res.status(200).json(user)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        if (!user) {
            return res.status(404).json({ message: 'No matching user with that ID' })
        } else {
            return res.status(200).json(user)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId })
        if (!user) {
            return res.status(404).json({ message: 'No matching user with that ID' })
        } else {
            await Thought.deleteMany({ _id: { $in: user.thoughts } })
            return res.status(200).json({ message: 'User and thoughts deleted.' })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const addFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        if (!friend) {
            return res.status(404).json({ message: "No user matching that ID." })
        } else {
            return res.status(200).json(friend)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        if (!friend) {
            return res.status(404).json({ message: "No user matching that ID." })
        } else {
            return res.status(200).json(friend)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}