import { Types } from "mongoose";

const ObjectId = Types.ObjectId;

export const thoughts = [
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
