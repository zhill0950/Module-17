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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../models/User"));
//GET All Users /users
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
//GET Single User by ID /users/:userId
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = yield User_1.default.findById(userId);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getSingleUser = getSingleUser;
//POST Create User /users
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield User_1.default.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.createUser = createUser;
//PUT Update User by ID /users/:userId
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = yield User_1.default.findOneAndUpdate({ _id: userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
//DELETE User by ID /users/:userId
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = yield User_1.default.findOneAndDelete({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        }
        else {
            res.json({ message: 'User deleted!' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
//POST Add Friend /users/:userId/friends/:friendId
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.params;
    try {
        if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid user or friend ID' });
        }
        const user = yield User_1.default.findOneAndUpdate({ _id: userId }, { $addToSet: { friends: friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.addFriend = addFriend;
//DELETE Friend /users/:userId/friends/:friendId
const deleteFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, friendId } = req.params;
    try {
        if (!mongoose_1.Types.ObjectId.isValid(userId) || !mongoose_1.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ message: 'Invalid user or friend ID' });
        }
        const user = yield User_1.default.findOneAndUpdate({ _id: userId }, { $pull: { friends: friendId } }, { new: true });
        if (!user) {
            res.status(404).json({ message: 'No user with this id!' });
        }
        else {
            res.json(user);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.deleteFriend = deleteFriend;
