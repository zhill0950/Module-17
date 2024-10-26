"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReaction = exports.addReaction = exports.deleteThought = exports.updateThought = exports.createThought = exports.getSingleThought = exports.getThoughts = void 0;
const index_js_1 = require("../models/index.js");
// GET All Thoughts /thoughts
const getThoughts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield index_js_1.Thought.find();
        res.json(thoughts);
    }
    catch (error) {
        console.error('Error fetching thoughts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getThoughts = getThoughts;
// GET Single Thought by ID /thoughts/:thoughtId
const getSingleThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    try {
        const thought = yield index_js_1.Thought.findById(thoughtId);
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
});
exports.getSingleThought = getSingleThought;
// POST Create Thought /thoughts
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtText, username } = req.body;
    try {
        if (!thoughtText || !username) {
            res.status(400).json({ message: 'Thought text and username are required.' });
        }
        const newThought = yield index_js_1.Thought.create({ thoughtText, username });
        yield index_js_1.User.findOneAndUpdate({ username }, { $addToSet: { thoughts: newThought._id } }, { new: true });
        res.status(201).json(newThought);
    }
    catch (error) {
        console.error('Error creating thought:', error);
        res.status(400).json({ message: error.message });
    }
});
exports.createThought = createThought;
// PUT Update Thought by ID /thoughts/:thoughtId
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    const updateData = req.body; // Collect update data
    try {
        const thought = yield index_js_1.Thought.findOneAndUpdate({ _id: thoughtId }, { $set: updateData }, { runValidators: true, new: true });
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
});
exports.updateThought = updateThought;
// DELETE Thought by ID /thoughts/:thoughtId
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    try {
        const thought = yield index_js_1.Thought.findOneAndDelete({ _id: thoughtId });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
        }
        else {
            // Optionally remove the thought from the user's thoughts array if needed
            yield index_js_1.User.updateMany({ thoughts: thoughtId }, { $pull: { thoughts: thoughtId } });
            res.json({ message: 'Thought deleted!' });
        }
    }
    catch (error) {
        console.error('Error deleting thought:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteThought = deleteThought;
// POST Add Reaction to Thought /thoughts/:thoughtId/reactions
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
        if (!reactionBody || !username) {
            res.status(400).json({ message: 'Reaction body and username are required.' });
        }
        const thought = yield index_js_1.Thought.findOneAndUpdate({ _id: thoughtId }, { $addToSet: { reactions: { reactionBody, username } } }, { new: true });
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
});
exports.addReaction = addReaction;
// DELETE Reaction from Thought /thoughts/:thoughtId/reactions/:reactionId
const deleteReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = yield index_js_1.Thought.findOneAndUpdate({ _id: thoughtId }, { $pull: { reactions: { _id: reactionId } } }, // Ensure you are pulling the reaction by its object ID
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
});
exports.deleteReaction = deleteReaction;
