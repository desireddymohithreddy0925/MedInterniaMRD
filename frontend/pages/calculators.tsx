import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, List, ListItem, ListItemButton, ListItemText,
  Divider, TextField, Button, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Navbar from '../components/Navbar';

export default function MedicalCalculators() {
  const [selectedCalc, setSelectedCalc] = useState('wells');
  
  // States for Wells Score (DVT)
  const [wellsChecks, setWellsChecks] = useState(new Array(9).fill(false));
  const [wellsAltDx, setWellsAltDx] = useState(false);
  
  // States for BMI
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const renderCalculator = () => {
    switch (selectedCalc) {
      case 'wells':
        const wellsScore = wellsChecks.filter(Boolean).length + (wellsAltDx ? -2 : 0);
        return (
          <Box>
            <Typography variant="h5" fontWeight={800} color="#0f172a" sx={{ mb: 1 }}>Wells' Criteria for DVT</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Calculates probability of deep vein thrombosis.</Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 4 }}>
              {[
                "Active cancer (treatment within last 6 months or palliative)",
                "Paralysis, paresis, or recent plaster immobilization of lower extremities",
                "Recently bedridden > 3 days, or major surgery within 12 weeks requiring general/regional anesthesia",
                "Localized tenderness along the distribution of the deep venous system",
                "Entire leg swollen",
                "Calf swelling > 3 cm compared to asymptomatic leg",
                "Pitting edema confined to the symptomatic leg",
                "Collateral superficial veins (non-varicose)",
                "Previously documented DVT"
              ].map((label, i) => (
                <FormControlLabel
                  key={i}
                  control={<Checkbox checked={wellsChecks[i]} onChange={(e) => {
                    const newChecks = [...wellsChecks];
                    newChecks[i] = e.target.checked;
                    setWellsChecks(newChecks);
                  }} />}
                  label={<Typography variant="body2">{label} (+1)</Typography>}
                />
              ))}
              <FormControlLabel
                  control={<Checkbox checked={wellsAltDx} onChange={(e) => setWellsAltDx(e.target.checked)} />}
                  label={<Typography variant="body2">Alternative diagnosis at least as likely as DVT (-2)</Typography>}
                />
            </Box>

            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f1f5f9', borderRadius: 2, textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Total Score</Typography>
              <Typography variant="h2" fontWeight={900} color={wellsScore >= 2 ? 'error.main' : 'success.main'}>{wellsScore}</Typography>
              <Typography variant="body1" fontWeight={700} sx={{ mt: 1 }}>
                {wellsScore >= 2 ? 'High Probability' : 'Low Probability'} of DVT
              </Typography>
            </Paper>
          </Box>
        );

      case 'bmi':
        const h = parseFloat(height) / 100; // cm to m
        const w = parseFloat(weight);
        const bmi = (w > 0 && h > 0) ? (w / (h * h)).toFixed(1) : '0.0';
        return (
          <Box>
            <Typography variant="h5" fontWeight={800} color="#0f172a" sx={{ mb: 1 }}>BMI Calculator</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Body Mass Index</Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Height (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
              </Grid>
            </Grid>

            <Paper elevation={0} sx={{ p: 3, bgcolor: '#f1f5f9', borderRadius: 2, textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>BMI Result</Typography>
              <Typography variant="h2" fontWeight={900} color="primary.main">{bmi}</Typography>
            </Paper>
          </Box>
        );
        
      default:
        return <Typography>Select a calculator.</Typography>;
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0', pt: 6, pb: 4, mb: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Typography variant="h4" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#0f172a' }}>
            <CalculateIcon fontSize="large" color="primary" />
            Medical Calculators
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Instantly generate clinical scores and indices without leaving the platform.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Grid container spacing={4}>
          
          {/* Sidebar Navigation */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden', bgcolor: 'white' }}>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton selected={selectedCalc === 'wells'} onClick={() => setSelectedCalc('wells')} sx={{ py: 2 }}>
                    <ListItemText primaryTypographyProps={{ fontWeight: 600 }} primary="Wells' Criteria for DVT" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton selected={selectedCalc === 'bmi'} onClick={() => setSelectedCalc('bmi')} sx={{ py: 2 }}>
                    <ListItemText primaryTypographyProps={{ fontWeight: 600 }} primary="BMI Calculator" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton disabled sx={{ py: 2 }}>
                    <ListItemText primaryTypographyProps={{ color: 'text.disabled' }} primary="CHADS2-VASc Score (Coming Soon)" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton disabled sx={{ py: 2 }}>
                    <ListItemText primaryTypographyProps={{ color: 'text.disabled' }} primary="Glasgow Coma Scale (Coming Soon)" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Calculator UI */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white', minHeight: 400 }}>
              {renderCalculator()}
            </Paper>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}
