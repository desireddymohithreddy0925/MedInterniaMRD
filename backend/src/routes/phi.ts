import { Router } from 'express';
import { scanForPhi, redactPhiFromText } from '../controllers/phiController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

// POST /api/phi/scan  — detect PHI in text
router.post('/scan', scanForPhi);

// POST /api/phi/redact — auto-redact PHI from text
router.post('/redact', redactPhiFromText);

export default router;
