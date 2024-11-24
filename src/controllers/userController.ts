import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { User } from '../models/index.js';

// GET All Users /users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET Single User by ID /users/:userId
export const getSingleUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        if (!Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        console.error('Error fetching single user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST Create User /users
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email } = req.body;
    try {
        if (!username || !email) {
            res.status(400).json({ message: 'Username and email are required.' });
        }

        const newUser = await User.create({ username, email });
        res.status(201).json(newUser);
    } catch (error: any) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: error.message });
    }
};

// PUT Update User by ID /users/:userId
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const updateData = req.body; // Collect update data
    try {
        if (!Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: updateData },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with this ID!' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        console.error('Error updating user:', error);
        res.status(400).json({ message: error.message });
    }
};

// DELETE User by ID /users/:userId
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        if (!Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findOneAndDelete({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
            res.json({ message: 'User deleted!' });
        }
    } catch (error: any) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST Add Friend /users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    const { userId, friendId } = req.params;
    try {
        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
            res.status(400).json({ message: 'Invalid user or friend ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with this ID!' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        console.error('Error adding friend:', error);
        res.status(400).json({ message: error.message });
    }
};

// DELETE Friend /users/:userId/friends/:friendId
export const deleteFriend = async (req: Request, res: Response): Promise<void> => {
    const { userId, friendId } = req.params;
    try {
        if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(friendId)) {
            res.status(400).json({ message: 'Invalid user or friend ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $pull: { friends: friendId } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user with this ID!' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        console.error('Error deleting friend:', error);
        res.status(400).json({ message: error.message });
    }
};
