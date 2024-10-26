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
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const users_1 = require("./data/users");
const thoughts_1 = require("./data/thoughts");
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/socialNetworkDB')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.User.deleteMany({});
        yield models_1.Thought.deleteMany({});
        const users = yield models_1.User.insertMany(users_1.usersData);
        yield models_1.Thought.insertMany(thoughts_1.thoughts);
        yield models_1.User.findByIdAndUpdate(users[0]._id, {
            friends: [users[1]._id],
        });
        console.log('Database seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
});
seedDatabase();
