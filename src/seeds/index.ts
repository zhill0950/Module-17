import connectDB from '../config/connection';
import cleanDB from './cleanDB';

try {
  await connectDB();
  await cleanDB();
  console.info('Database cleaned!');
  process.exit(0);
} catch (error) {
  console.error('Error cleaning database:', error);
  process.exit(1);
}