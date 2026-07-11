import express from 'express';
import { protect } from '../middleware/auth';
import {
  getConversations,
  getMessages,
  sendMessage
} from '../controllers/messageController';

const router = express.Router();

router.use(protect);

router.get('/conversations', getConversations);
router.get('/:conversationId', getMessages);
router.post('/', sendMessage);

export default router;
