import { Request, Response } from 'express';
import { detectPhi, redactPhi } from '../utils/phiDetector';

/**
 * @route  POST /api/phi/scan
 * @desc   Scans provided text for PHI and returns findings
 * @access Private
 */
export const scanForPhi = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ success: false, message: 'Text is required' });
      return;
    }

    const findings = detectPhi(text);

    res.status(200).json({
      success: true,
      data: {
        hasPhi: findings.length > 0,
        findings,
        count: findings.length
      }
    });
  } catch (error: any) {
    console.error('PHI scan error:', error);
    res.status(500).json({ success: false, message: 'Server error during PHI scan' });
  }
};

/**
 * @route  POST /api/phi/redact
 * @desc   Auto-redacts all detected PHI from text and returns cleaned version
 * @access Private
 */
export const redactPhiFromText = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ success: false, message: 'Text is required' });
      return;
    }

    const findings = detectPhi(text);
    const redactedText = redactPhi(text);

    res.status(200).json({
      success: true,
      data: {
        original: text,
        redacted: redactedText,
        redactedCount: findings.length,
        findings
      }
    });
  } catch (error: any) {
    console.error('PHI redact error:', error);
    res.status(500).json({ success: false, message: 'Server error during PHI redaction' });
  }
};
