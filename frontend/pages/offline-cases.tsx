import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Avatar, Button, IconButton, LinearProgress
} from '@mui/material';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Navbar from '../components/Navbar';

export default function OfflineCases() {
  const [isOnline, setIsOnline] = useState(true);
  const [cases, setCases] = useState([
    {
      id: 1,
      title: 'Atypical presentation of Pulmonary Embolism',
      author: 'Dr. Sarah Jenkins',
      date: 'Saved 2 days ago',
      size: '1.2 MB',
      status: 'downloaded', // downloaded, downloading, none
      specialty: 'Pulmonology'
    },
    {
      id: 2,
      title: 'Pediatric Kawasaki Disease with Coronary Aneurysm',
      author: 'Dr. Michael Chen',
      date: 'Saved 5 hours ago',
      size: '4.5 MB (Contains images)',
      status: 'downloaded',
      specialty: 'Pediatrics'
    },
    {
      id: 3,
      title: 'Advanced Management of Acute Decompensated Heart Failure',
      author: 'Dr. Aaron Jones',
      date: '',
      size: '850 KB',
      status: 'none',
      specialty: 'Cardiology'
    }
  ]);

  useEffect(() => {
    // Mock network status listener
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleDownload = (id: number) => {
    setCases(cases.map(c => c.id === id ? { ...c, status: 'downloading' } : c));
    setTimeout(() => {
      setCases(prev => prev.map(c => c.id === id ? { ...c, status: 'downloaded', date: 'Saved just now' } : c));
    }, 2000);
  };

  const handleRemove = (id: number) => {
    setCases(cases.map(c => c.id === id ? { ...c, status: 'none', date: '' } : c));
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', pt: 12, pb: 4, mb: 4, position: 'relative', overflow: 'hidden' }}>
        {!isOnline && (
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bgcolor: 'error.main', py: 0.5, textAlign: 'center' }}>
            <Typography variant="caption" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <SignalWifiOffIcon fontSize="small" /> YOU ARE CURRENTLY OFFLINE
            </Typography>
          </Box>
        )}
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3, mt: !isOnline ? 2 : 0 }}>
          <Chip icon={<CloudOffIcon />} label="PWA Offline Mode" color="primary" size="small" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
            Offline Vault
          </Typography>
          <Typography variant="subtitle1" color="#94a3b8">
            Access downloaded cases and guidelines without cell reception or Wi-Fi. 
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={800} sx={{ color: '#0f172a' }}>
            Your Downloaded Content
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Storage Used: 5.7 MB
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {cases.map((c) => (
            <Grid size={{ xs: 12 }} key={c.id}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid', borderColor: c.status === 'downloaded' ? '#e2e8f0' : '#f1f5f9', bgcolor: 'white', opacity: (!isOnline && c.status !== 'downloaded') ? 0.5 : 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Chip label={c.specialty} size="small" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700, bgcolor: '#f1f5f9', color: '#475569' }} />
                      {c.status === 'downloaded' && <Typography variant="caption" color="success.main" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><DownloadDoneIcon fontSize="small" /> Available Offline</Typography>}
                    </Box>
                    <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mb: 1 }}>
                      {c.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      By {c.author} • {c.size}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {c.status === 'downloaded' && (
                      <>
                        <Typography variant="caption" color="text.disabled" sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>{c.date}</Typography>
                        <Button variant="outlined" size="small" disabled={!isOnline} sx={{ fontWeight: 700 }}>Read Now</Button>
                        <IconButton size="small" onClick={() => handleRemove(c.id)} sx={{ color: 'error.main' }}>
                          <DeleteOutlineIcon />
                        </IconButton>
                      </>
                    )}
                    {c.status === 'none' && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        startIcon={<CloudDownloadIcon />} 
                        onClick={() => handleDownload(c.id)}
                        disabled={!isOnline}
                        sx={{ fontWeight: 700 }}
                      >
                        Download
                      </Button>
                    )}
                    {c.status === 'downloading' && (
                      <Box sx={{ width: 100, textAlign: 'center' }}>
                        <Typography variant="caption" fontWeight={700} color="primary">Downloading...</Typography>
                        <LinearProgress sx={{ mt: 1, borderRadius: 2 }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
