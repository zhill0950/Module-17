import express from 'express';
import { getThoughts, createThought } from '../../controllers/thoughtController';

const router = express.Router();

router.get('/', getThoughts);
router.post('/', createThought);

export default router;
