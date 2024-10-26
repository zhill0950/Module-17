import { Types as MongooseTypes } from "mongoose";

export const usersData = [
  {
    _id: new MongooseTypes.ObjectId(),
    username: "testUser",
    email: "email1@aol.com",
    thoughts: [],
    friends: [],
  },
  {
    _id: new MongooseTypes.ObjectId(),
    username: "johndoe",
    email: "johndoe@example.com",
    thoughts: [],
    friends: [],
  },
  {
    _id: new MongooseTypes.ObjectId(),
    username: "testUser2",
    email: "email2@msn.com",
    thoughts: [],
    friends: [],
  },
];

