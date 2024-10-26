import express from 'express';
import router from './routes';
import apiRoutes from './routes/api/index.js';
import connectDB from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(router);
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
