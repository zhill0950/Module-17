import { User, Thought } from "../models";

const cleanDB = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Database cleaned successfully!");
  } catch (err) {
    console.error("Error cleaning the database:", err);
  }
};

export default cleanDB;
