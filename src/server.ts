import express from 'express';
import router from './routes/index.js';
import connectDB from './config/connection.js';

connectDB();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
