import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// GET All Thoughts /thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// GET Single Thought by ID /thoughts/:thoughtId
export const getSingleThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'Thought not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// POST Create Thought /thoughts
export const createThought = async (req: Request, res: Response) => {
    const { thoughtText, username } = req.body;
    try {
        const newThought = await Thought.create({ thoughtText, username });
        
        await User.findOneAndUpdate(
            { username },
            { $addToSet: { thoughts: newThought._id } },
            { new: true }
        );
        res.status(201).json(newThought);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// PUT Update Thought by ID /thoughts/:thoughtId
export const updateThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        } else {
            res.json(thought);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Thought by ID /thoughts/:thoughtId
export const deleteThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndDelete({ _id: thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        } else {
            // Optionally remove the thought from the user's thoughts array if needed
            await User.updateMany(
                { thoughts: thoughtId },
                { $pull: { thoughts: thoughtId } }
            );
            res.json({ message: 'Thought deleted!' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// POST Add Reaction to Thought /thoughts/:thoughtId/reactions
export const addReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $addToSet: { reactions: { reactionBody, username } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        } else {
            res.json(thought);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE Reaction from Thought /thoughts/:thoughtId/reactions/:reactionId
export const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
        } else {
            res.json(thought);
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
