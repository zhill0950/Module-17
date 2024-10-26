"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
const Thought = (0, mongoose_1.model)('Thought', thoughtSchema);
exports.default = Thought;
