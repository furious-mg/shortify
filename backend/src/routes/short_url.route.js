import express from 'express';
import { createShortUrl } from '../controllers/shorturl.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/", authMiddleware, createShortUrl);

export default router;