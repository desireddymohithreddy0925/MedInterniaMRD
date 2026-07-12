import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Avatar, Button, Switch, FormControlLabel
} from '@mui/material';
import ContrastIcon from '@mui/icons-material/Contrast';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Navbar from '../components/Navbar';

export default function RadiologyDemo() {
  const [isRadMode, setIsRadMode] = useState(false);

  // Apply true black to the body background when active to eliminate all screen glare
  useEffect(() => {
    if (isRadMode) {
      document.body.style.backgroundColor = '#000000';
    } else {
      document.body.style.backgroundColor = '#f8fafc';
    }
    return () => {
      document.body.style.backgroundColor = '#f8fafc';
    };
  }, [isRadMode]);

  return (
    <Box sx={{ minHeight: '100vh', pb: 8, transition: 'all 0.3s ease' }}>
      {/* Hide navbar completely or dim it in radiology mode to prevent light bleed */}
      <Box sx={{ opacity: isRadMode ? 0.05 : 1, transition: 'opacity 0.3s ease', pointerEvents: isRadMode ? 'none' : 'auto' }}>
        <Navbar />
      </Box>
      
      {/* Header */}
      <Box sx={{ 
        bgcolor: isRadMode ? '#000000' : '#1e293b', 
        color: isRadMode ? '#333333' : 'white', 
        pt: isRadMode ? 4 : 12, 
        pb: 4, 
        mb: 4, 
        transition: 'all 0.3s ease' 
      }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              {!isRadMode && <Chip icon={<MedicalServicesIcon />} label="Diagnostic Viewer" color="info" size="small" sx={{ mb: 2, fontWeight: 800 }} />}
              <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                Case #882: Pulmonary Nodule
              </Typography>
              <Typography variant="subtitle1" color={isRadMode ? '#222222' : '#94a3b8'} sx={{ maxWidth: 700 }}>
                High-resolution CT Scan. Toggle Radiology Mode to eliminate UI light bleed and maximize contrast perception.
              </Typography>
            </Box>

            <Paper elevation={0} sx={{ 
              p: 2, 
              borderRadius: 3, 
              bgcolor: isRadMode ? '#0a0a0a' : 'white', 
              border: '1px solid', 
              borderColor: isRadMode ? '#111111' : '#e2e8f0',
              transition: 'all 0.3s ease'
            }}>
              <FormControlLabel
                control={<Switch checked={isRadMode} onChange={(e) => setIsRadMode(e.target.checked)} color="info" />}
                label={
                  <Typography variant="body2" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: isRadMode ? '#555555' : '#0f172a' }}>
                    <ContrastIcon fontSize="small" /> Radiology Dark Mode
                  </Typography>
                }
              />
            </Paper>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Grid container spacing={4}>
          
          {/* Clinical Context (Sidebar) */}
          <Grid item xs={12} md={3} sx={{ opacity: isRadMode ? 0.1 : 1, transition: 'opacity 0.3s ease' }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2, color: isRadMode ? '#333' : '#0f172a' }}>Clinical Context</Typography>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: isRadMode ? '#111' : '#e2e8f0', bgcolor: isRadMode ? '#050505' : 'white', mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: isRadMode ? '#444' : '#64748b', mb: 0.5 }}>Patient</Typography>
              <Typography variant="body2" sx={{ color: isRadMode ? '#222' : '#0f172a', mb: 2, fontWeight: 600 }}>64yo Male</Typography>
              
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: isRadMode ? '#444' : '#64748b', mb: 0.5 }}>History</Typography>
              <Typography variant="body2" sx={{ color: isRadMode ? '#222' : '#0f172a', mb: 2 }}>Chronic cough, 40-pack year smoking history. Weight loss of 10lbs over 2 months.</Typography>
              
              <Typography variant="subtitle2" fontWeight={800} sx={{ color: isRadMode ? '#444' : '#64748b', mb: 0.5 }}>Study</Typography>
              <Typography variant="body2" sx={{ color: isRadMode ? '#222' : '#0f172a' }}>CT Chest W/O Contrast</Typography>
            </Paper>
          </Grid>

          {/* Diagnostic Image Viewer */}
          <Grid item xs={12} md={9}>
            <Box sx={{ 
              width: '100%', 
              height: 600, 
              bgcolor: '#000000', 
              borderRadius: isRadMode ? 0 : 4, 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: isRadMode ? 'none' : '0 10px 40px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              border: isRadMode ? 'none' : '1px solid #e2e8f0'
            }}>
              {/* Simulated CT Scan Image using CSS Gradients */}
              <Box sx={{
                width: '80%',
                height: '80%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 50% 50%, #2a2a2a 0%, #0a0a0a 40%, #000000 70%)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: isRadMode ? 'contrast(1.2) brightness(1.1)' : 'none',
                transition: 'filter 0.3s ease'
              }}>
                {/* Simulated lung fields and spine */}
                <Box sx={{ width: '30%', height: '60%', bgcolor: '#050505', borderRadius: '40% 60% 40% 60%', position: 'absolute', left: '15%' }} />
                <Box sx={{ width: '30%', height: '60%', bgcolor: '#050505', borderRadius: '60% 40% 60% 40%', position: 'absolute', right: '15%' }} />
                <Box sx={{ width: '10%', height: '20%', bgcolor: '#333333', borderRadius: '50%', position: 'absolute', top: '20%', filter: 'blur(2px)' }} />
                
                {/* The "Nodule" */}
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  bgcolor: '#ffffff', 
                  borderRadius: '50%', 
                  position: 'absolute', 
                  right: '25%', 
                  top: '40%',
                  filter: 'blur(1px)',
                  boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                }} />
              </Box>

              {/* Viewer Tools Overlay */}
              <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 1, opacity: isRadMode ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
                <Button variant="contained" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>W/L</Button>
                <Button variant="contained" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>Pan</Button>
                <Button variant="contained" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>Zoom</Button>
              </Box>
              
              {/* Image Metadata */}
              <Typography variant="caption" sx={{ position: 'absolute', bottom: 20, left: 20, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                Se: 3 / Im: 42<br/>
                Thickness: 1.25mm
              </Typography>
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}
