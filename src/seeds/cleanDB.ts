import { User, Thought } from '../models/index';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Database cleaned!');
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }
};

export default cleanDB