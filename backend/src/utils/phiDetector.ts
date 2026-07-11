/**
 * PHI (Protected Health Information) Detector
 * 
 * Uses regex patterns to detect common HIPAA-defined PHI categories:
 * - Social Security Numbers
 * - Phone numbers
 * - Email addresses
 * - Dates (DOB, calendar dates)
 * - US ZIP codes
 * - Medical Record Numbers (MRN)
 * - IP addresses
 * - Fax numbers
 * - Account / credit card numbers
 * - URLs containing personal info
 */

export interface PhiFinding {
  type: string;
  match: string;
  index: number;
}

const PHI_PATTERNS: { type: string; regex: RegExp }[] = [
  {
    type: 'Social Security Number',
    regex: /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b/g
  },
  {
    type: 'Phone Number',
    regex: /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g
  },
  {
    type: 'Email Address',
    regex: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Z|a-z]{2,}\b/g
  },
  {
    type: 'Date (Potential DOB)',
    regex: /\b(0?[1-9]|1[0-2])[\/\-\.](0?[1-9]|[12]\d|3[01])[\/\-\.](\d{2}|\d{4})\b/g
  },
  {
    type: 'Date (Written)',
    regex: /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi
  },
  {
    type: 'US ZIP Code',
    regex: /\b\d{5}(-\d{4})?\b/g
  },
  {
    type: 'Medical Record Number',
    regex: /\b(MRN|Medical\s*Record\s*(Number|#|No\.?)?)\s*:?\s*[A-Z0-9]{5,15}\b/gi
  },
  {
    type: 'IP Address',
    regex: /\b((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g
  },
  {
    type: 'Account / ID Number',
    regex: /\b(Account|Acct|Patient\s*ID|Patient#|ID)\s*[:#]?\s*\d{6,}\b/gi
  },
  {
    type: 'URL',
    regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi
  }
];

/**
 * Scans text and returns all PHI findings.
 */
export function detectPhi(text: string): PhiFinding[] {
  const findings: PhiFinding[] = [];

  for (const { type, regex } of PHI_PATTERNS) {
    // Reset lastIndex for global regexes
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // Avoid duplicate matches at same index
      const alreadyFound = findings.some(f => f.index === match!.index && f.match === match![0]);
      if (!alreadyFound) {
        findings.push({ type, match: match[0], index: match.index });
      }
    }
  }

  // Sort by position in text
  return findings.sort((a, b) => a.index - b.index);
}

/**
 * Replaces all detected PHI with [REDACTED].
 */
export function redactPhi(text: string): string {
  let redacted = text;

  for (const { regex } of PHI_PATTERNS) {
    regex.lastIndex = 0;
    redacted = redacted.replace(regex, '[REDACTED]');
  }

  return redacted;
}
