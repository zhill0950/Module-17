import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from '../models/User';

//GET All Users /users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

//GET Single User by ID /users/:userId
export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        
        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

//POST Create User /users
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

//PUT Update User by ID /users/:userId
export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

//DELETE User by ID /users/:userId
export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        
        if (!Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
            res.json({ message: 'User deleted!' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

//POST Add Friend /users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        
        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid user or friend ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

//DELETE Friend /users/:userId/friends/:friendId
export const deleteFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;
    try {
        
        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid user or friend ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
