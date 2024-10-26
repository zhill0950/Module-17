import express from 'express';
import userRoutes from './api/userRoutes';
import thoughtRoutes from './api/thoughtRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const apiRouter = express.Router();
apiRouter.use('/users', userRoutes);
apiRouter.use('/thoughts', thoughtRoutes);

app.use('/api', apiRouter);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

export default apiRouter;
