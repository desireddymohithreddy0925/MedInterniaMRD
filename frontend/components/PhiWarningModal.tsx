import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  IconButton,
  Divider
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ShieldIcon from '@mui/icons-material/Shield';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export interface PhiFinding {
  type: string;
  match: string;
  index: number;
}

interface PhiWarningModalProps {
  open: boolean;
  findings: PhiFinding[];
  onClose: () => void;
  onRedactAndContinue: () => void;
  onPublishAnyway: () => void;
}

const PHI_TYPE_COLORS: Record<string, 'error' | 'warning' | 'info'> = {
  'Social Security Number': 'error',
  'Phone Number': 'warning',
  'Email Address': 'warning',
  'Date (Potential DOB)': 'warning',
  'Date (Written)': 'warning',
  'US ZIP Code': 'info',
  'Medical Record Number': 'error',
  'IP Address': 'info',
  'Account / ID Number': 'error',
  'URL': 'info',
};

export default function PhiWarningModal({
  open,
  findings,
  onClose,
  onRedactAndContinue,
  onPublishAnyway
}: PhiWarningModalProps) {
  const criticalCount = findings.filter(f =>
    ['Social Security Number', 'Medical Record Number', 'Account / ID Number'].includes(f.type)
  ).length;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <WarningAmberIcon sx={{ color: 'warning.main', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={800}>
            Potential PHI Detected
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Alert
          severity={criticalCount > 0 ? 'error' : 'warning'}
          icon={<ShieldIcon />}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          <Typography variant="body2" fontWeight={600}>
            {criticalCount > 0
              ? `⚠️ ${criticalCount} critical PHI item(s) found (SSN / MRN / Account Number). Publishing without redaction may violate HIPAA.`
              : 'We found potentially identifiable information in your case text. Please review before publishing.'}
          </Typography>
        </Alert>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Detected items ({findings.length})
        </Typography>

        <List sx={{ p: 0 }}>
          {findings.map((finding, idx) => (
            <React.Fragment key={idx}>
              <ListItem
                sx={{
                  bgcolor: '#f8f9fa',
                  borderRadius: 2,
                  mb: 1,
                  px: 2,
                  py: 1.5,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <WarningAmberIcon fontSize="small" color={PHI_TYPE_COLORS[finding.type] || 'warning'} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={finding.type}
                        size="small"
                        color={PHI_TYPE_COLORS[finding.type] || 'warning'}
                        variant="outlined"
                        sx={{ fontWeight: 600, fontSize: '11px' }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        bgcolor: 'rgba(0,0,0,0.05)',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block',
                        mt: 0.5,
                        fontSize: '13px',
                        color: 'error.main',
                        fontWeight: 600
                      }}
                    >
                      "{finding.match.length > 40 ? finding.match.slice(0, 40) + '…' : finding.match}"
                    </Typography>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2" color="text.secondary">
          <strong>Redact & Continue</strong> will automatically replace all detected items with <code>[REDACTED]</code> before publishing.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1.5, gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button
          variant="text"
          color="inherit"
          onClick={onClose}
          fullWidth={false}
          sx={{ textTransform: 'none' }}
        >
          Let me fix it
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={onPublishAnyway}
          sx={{ textTransform: 'none', ml: 'auto' }}
        >
          Publish Anyway
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onRedactAndContinue}
          startIcon={<AutoFixHighIcon />}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          Redact & Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
