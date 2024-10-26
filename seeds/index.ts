import mongoose from 'mongoose';
import { User, Thought } from '../models';
import { usersData } from './data/users';
import { thoughts } from './data/thoughts';

mongoose
  .connect('mongodb://127.0.0.1:27017/socialNetworkDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err: Error) => console.error(err));

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = await User.insertMany(usersData);

    await Thought.insertMany(thoughts); 

    await User.findByIdAndUpdate(users[0]._id, {
      friends: [users[1]._id],
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();