import express from 'express';
import { createUser, getUsers, updateUser } from '../controllers/userController';

const router = express.Router();
// routes
router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:_id', updateUser);

export default router;