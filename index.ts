import express from 'express';
import apiRouter from './routes/index';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
