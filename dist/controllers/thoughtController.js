import { Thought, User } from '../models/index.js';
// GET All Thoughts /thoughts
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        console.error('Error fetching thoughts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// GET Single Thought by ID /thoughts/:thoughtId
export const getSingleThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({ message: 'Thought not found' });
        }
    }
    catch (error) {
        console.error('Error fetching single thought:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// POST Create Thought /thoughts
export const createThought = async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
        if (!thoughtText || !username) {
            res.status(400).json({ message: 'Thought text and username are required.' });
        }
        const newThought = await Thought.create({ thoughtText, username });
        await User.findOneAndUpdate({ username }, { $addToSet: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    }
    catch (error) {
        console.error('Error creating thought:', error);
        res.status(400).json({ message: error.message });
    }
};
// PUT Update Thought by ID /thoughts/:thoughtId
export const updateThought = async (req, res) => {
    const { thoughtId } = req.params;
    const updateData = req.body; // Collect update data
    try {
        const thought = await Thought.findOneAndUpdate({ _id: thoughtId }, { $set: updateData }, { runValidators: true, new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this ID!' });
        }
        else {
            res.json(thought);
        }
    }
    catch (error) {
        console.error('Error updating thought:', error);
        res.status(400).json({ message: error.message });
    }
};
// DELETE Thought by ID /thoughts/:thoughtId
export const deleteThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findOneAndDelete({ _id: thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        }
        else {
            // Optionally remove the thought from the user's thoughts array if needed
            await User.updateMany({ thoughts: thoughtId }, { $pull: { thoughts: thoughtId } });
            res.json({ message: 'Thought deleted!' });
        }
    }
    catch (error) {
        console.error('Error deleting thought:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// POST Add Reaction to Thought /thoughts/:thoughtId/reactions
export const addReaction = async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        if (!reactionBody || !username) {
            res.status(400).json({ message: 'Reaction body and username are required.' });
        }
        const thought = await Thought.findOneAndUpdate({ _id: thoughtId }, { $addToSet: { reactions: { reactionBody, username } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this ID!' });
        }
        else {
            res.json(thought);
        }
    }
    catch (error) {
        console.error('Error adding reaction:', error);
        res.status(400).json({ message: error.message });
    }
};
// DELETE Reaction from Thought /thoughts/:thoughtId/reactions/:reactionId
export const deleteReaction = async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findOneAndUpdate({ _id: thoughtId }, { $pull: { reactions: { _id: reactionId } } }, // Ensure you are pulling the reaction by its object ID
        { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with this ID!' });
        }
        else {
            res.json(thought);
        }
    }
    catch (error) {
        console.error('Error deleting reaction:', error);
        res.status(400).json({ message: error.message });
    }
};
