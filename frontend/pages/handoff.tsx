import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, TextField, Button, MenuItem, Chip,
  Divider, IconButton, Alert, AlertTitle
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PrintIcon from '@mui/icons-material/Print';
import LockIcon from '@mui/icons-material/Lock';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/Navbar';

export default function HandoffTool() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      room: '402-A',
      name: 'John Doe',
      severity: 'Watcher',
      summary: '65yo M presenting with acute exacerbation of COPD. On BiPAP currently. Responsive to initial bronchodilator therapy but WOB remains elevated.',
      actions: '1. Check ABG at 22:00.\\n2. Titrate FiO2 to maintain SpO2 > 92%.\\n3. Consider transferring to ICU if respiratory rate > 30.',
      situation: 'If patient becomes confused or lethargic, immediately draw new ABG and prepare for intubation.',
      synthesis: ''
    }
  ]);

  const addPatient = () => {
    setPatients([...patients, { id: Date.now(), room: '', name: '', severity: 'Stable', summary: '', actions: '', situation: '', synthesis: '' }]);
  };

  const removePatient = (id: number) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'Unstable') return 'error';
    if (severity === 'Watcher') return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0', pt: 6, pb: 4, mb: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2, color: '#0f172a' }}>
              <AssignmentIcon fontSize="large" color="primary" />
              IPASS Shift Handoff
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 600 }}>
              Structure your clinical sign-outs. This notepad is local to your device and never uploaded to public servers to protect patient privacy.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<PrintIcon />} sx={{ fontWeight: 700, bgcolor: 'white' }}>
              Print / Export
            </Button>
            <Button variant="contained" startIcon={<NoteAddIcon />} onClick={addPatient} sx={{ fontWeight: 700 }}>
              New Patient
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        
        <Alert icon={<LockIcon fontSize="inherit" />} severity="info" sx={{ mb: 4, borderRadius: 2, '& .MuiAlert-message': { width: '100%' } }}>
          <AlertTitle sx={{ fontWeight: 700 }}>HIPAA Compliance Notice</AlertTitle>
          Do not include full PHI (Protected Health Information) such as full names, SSNs, or exact dates of birth in these fields. Use initials and room numbers.
        </Alert>

        <Grid container spacing={3}>
          {patients.map((patient, index) => (
            <Grid size={{ xs: 12 }} key={patient.id}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', position: 'relative' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" fontWeight={800} color="#0f172a">
                    Patient {index + 1}
                  </Typography>
                  <IconButton color="error" size="small" onClick={() => removePatient(patient.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <TextField fullWidth label="Room / Bed" defaultValue={patient.room} size="small" sx={{ mb: 3 }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <TextField fullWidth label="Patient Initials / Identifier" defaultValue={patient.name} size="small" sx={{ mb: 3 }} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField 
                      select 
                      fullWidth 
                      label="I - Illness Severity" 
                      defaultValue={patient.severity} 
                      size="small"
                      sx={{ mb: 3 }}
                    >
                      <MenuItem value="Stable">Stable</MenuItem>
                      <MenuItem value="Watcher">Watcher</MenuItem>
                      <MenuItem value="Unstable">Unstable</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      multiline rows={2} fullWidth 
                      label="P - Patient Summary (History, Course)" 
                      defaultValue={patient.summary} 
                      sx={{ mb: 3 }} 
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField 
                      multiline rows={4} fullWidth 
                      label="A - Action List (To-Dos)" 
                      defaultValue={patient.actions} 
                      sx={{ mb: 3 }} 
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField 
                      multiline rows={4} fullWidth 
                      label="S - Situation Awareness & Contingency Planning" 
                      defaultValue={patient.situation} 
                      sx={{ mb: 3 }} 
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField 
                      fullWidth 
                      label="S - Synthesis by Receiver (Notes from the person taking over)" 
                      defaultValue={patient.synthesis} 
                    />
                  </Grid>

                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
           <Button variant="outlined" startIcon={<AddIcon />} onClick={addPatient} sx={{ borderRadius: 8, px: 4, py: 1.5, fontWeight: 700, borderStyle: 'dashed', borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
             Add Another Patient
           </Button>
        </Box>

      </Box>
    </Box>
  );
}
