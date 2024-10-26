"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersData = void 0;
const mongoose_1 = require("mongoose");
exports.usersData = [
    {
        _id: new mongoose_1.Types.ObjectId(),
        username: "testUser",
        email: "email1@aol.com",
        thoughts: [],
        friends: [],
    },
    {
        _id: new mongoose_1.Types.ObjectId(),
        username: "johndoe",
        email: "johndoe@example.com",
        thoughts: [],
        friends: [],
    },
    {
        _id: new mongoose_1.Types.ObjectId(),
        username: "testUser2",
        email: "email2@msn.com",
        thoughts: [],
        friends: [],
    },
];
