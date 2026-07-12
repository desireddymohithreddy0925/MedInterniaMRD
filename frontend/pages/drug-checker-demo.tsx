import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Avatar, Button, Divider, TextField, Alert, AlertTitle
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicationIcon from '@mui/icons-material/Medication';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Navbar from '../components/Navbar';

export default function DrugCheckerDemo() {
  const [commentText, setCommentText] = useState('I recommend starting the patient on Sildenafil 50mg for his pulmonary hypertension, and adding a Nitroglycerin patch for his angina.');
  const [isChecking, setIsChecking] = useState(false);
  const [interactionResult, setInteractionResult] = useState<'none' | 'severe' | null>(null);

  const handleCheck = () => {
    setIsChecking(true);
    setInteractionResult(null);
    
    // Simulate API call to RxNav or similar service
    setTimeout(() => {
      setIsChecking(false);
      // Mock simple keyword detection for the demo
      if (commentText.toLowerCase().includes('sildenafil') && commentText.toLowerCase().includes('nitroglycerin')) {
        setInteractionResult('severe');
      } else {
        setInteractionResult('none');
      }
    }, 1500);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', pt: 12, pb: 4, mb: 4, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
          <Chip icon={<HealthAndSafetyIcon />} label="Clinical Safety Guardrails" color="success" size="small" sx={{ mb: 2, fontWeight: 800 }} />
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <MedicationIcon fontSize="large" sx={{ opacity: 0.8 }} />
            Integrated Drug Interaction Checker
          </Typography>
          <Typography variant="subtitle1" color="#94a3b8" sx={{ maxWidth: 700 }}>
            Automatically scan proposed treatment plans and comments for dangerous drug-drug interactions before posting them to a case.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: '#0f172a' }}>
          Propose a Treatment Plan
        </Typography>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Avatar sx={{ bgcolor: '#eff6ff', color: '#1d4ed8', fontWeight: 800 }}>Dr</Avatar>
            <Box sx={{ flex: 1 }}>
              <TextField 
                fullWidth 
                multiline 
                rows={4} 
                variant="outlined"
                placeholder="Type your clinical advice or medication recommendations here..." 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                sx={{ bgcolor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' } }}
              />

              {/* Interaction Results Panel */}
              {interactionResult === 'severe' && (
                <Alert icon={<WarningAmberIcon fontSize="inherit" />} severity="error" sx={{ mt: 3, borderRadius: 2, border: '1px solid #fecaca', '& .MuiAlert-message': { width: '100%' } }}>
                  <AlertTitle sx={{ fontWeight: 800 }}>Severe Interaction Detected!</AlertTitle>
                  <Typography variant="body2" fontWeight={700} sx={{ mb: 1 }}>
                    Sildenafil + Nitroglycerin
                  </Typography>
                  <Typography variant="body2">
                    Concurrent use of phosphodiesterase-5 (PDE5) inhibitors and nitrates is strictly contraindicated. This combination can cause profound, life-threatening hypotension and syncope.
                  </Typography>
                </Alert>
              )}

              {interactionResult === 'none' && (
                <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" />} severity="success" sx={{ mt: 3, borderRadius: 2, border: '1px solid #bbf7d0' }}>
                  <AlertTitle sx={{ fontWeight: 800 }}>No Known Interactions</AlertTitle>
                  <Typography variant="body2">
                    The medications detected in your comment have no major documented drug-drug interactions.
                  </Typography>
                </Alert>
              )}

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button 
                  variant="outlined" 
                  color="warning" 
                  startIcon={<MedicationIcon />} 
                  onClick={handleCheck}
                  disabled={isChecking || !commentText}
                  sx={{ fontWeight: 700, borderRadius: 2, borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                >
                  {isChecking ? 'Scanning...' : 'Check Interactions'}
                </Button>
                <Button variant="contained" disabled={isChecking || !commentText} sx={{ px: 4, py: 1, fontWeight: 700, borderRadius: 2 }}>
                  Post Comment
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>

      </Box>
    </Box>
  );
}
