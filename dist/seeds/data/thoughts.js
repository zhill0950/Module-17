"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thoughts = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Types.ObjectId;
exports.thoughts = [
    {
        _id: new ObjectId(),
        thoughtText: "One time, at band camp...",
        createdAt: new Date(),
        username: "testUser",
        reactions: [],
    },
    {
        _id: new ObjectId(),
        thoughtText: "I can do this all day!",
        createdAt: new Date(),
        username: "johndoe",
        reactions: [],
    },
];
