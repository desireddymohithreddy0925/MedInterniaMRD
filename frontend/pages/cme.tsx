import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Button, Divider, LinearProgress,
  List, ListItem, ListItemIcon, ListItemText, Chip, Avatar
} from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import DownloadIcon from '@mui/icons-material/Download';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Navbar from '../components/Navbar';

export default function CMEDashboard() {
  const [downloading, setDownloading] = useState(false);

  const activities = [
    { id: 1, type: 'webinar', title: 'Advances in Neo-Adjuvant Chemotherapy', credits: 1.5, date: 'Jul 10, 2026', cat: 'Category 1' },
    { id: 2, type: 'review', title: 'Peer Review: Complex Cardiac Arrhythmia', credits: 0.5, date: 'Jul 08, 2026', cat: 'Category 2' },
    { id: 3, type: 'webinar', title: 'Pediatric Emergency Protocols 2026', credits: 1.0, date: 'Jul 05, 2026', cat: 'Category 1' },
    { id: 4, type: 'review', title: 'Case Analysis: Atypical Pneumonia', credits: 0.5, date: 'Jul 02, 2026', cat: 'Category 2' },
  ];

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Certificate generated and downloaded successfully!");
    }, 2000);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6, mb: 4 }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
              <WorkspacePremiumIcon fontSize="large" sx={{ color: '#fbbf24' }} />
              CME Credit Tracker
            </Typography>
            <Typography variant="subtitle1" color="#cbd5e1">
              Automatically track your educational hours on MedInternia for official CME requirements.
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            disabled={downloading}
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{
              bgcolor: '#fbbf24',
              color: '#78350f',
              fontWeight: 800,
              textTransform: 'none',
              borderRadius: 3,
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#f59e0b' }
            }}
          >
            {downloading ? 'Generating PDF...' : 'Download Certificate'}
          </Button>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
        <Grid container spacing={4}>
          
          {/* Progress Overview */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', height: '100%' }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Your Progress</Typography>
              
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary">Category 1 Credits</Typography>
                  <Typography variant="body2" fontWeight={800}>2.5 / 20</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(2.5/20)*100} sx={{ height: 8, borderRadius: 4, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#3b82f6' } }} />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary">Category 2 Credits</Typography>
                  <Typography variant="body2" fontWeight={800}>1.0 / 10</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(1.0/10)*100} sx={{ height: 8, borderRadius: 4, bgcolor: '#f1f5f9', '& .MuiLinearProgress-bar': { bgcolor: '#10b981' } }} />
              </Box>

              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" fontWeight={900} color="primary.main">3.5</Typography>
                <Typography variant="subtitle2" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Total CME Earned</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Activity Log */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0', bgcolor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight={700}>Recent Educational Activity</Typography>
                <Chip label="Verified by MedInternia" color="success" size="small" icon={<CheckCircleIcon />} sx={{ fontWeight: 600 }} />
              </Box>
              <List sx={{ p: 0 }}>
                {activities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ py: 2.5, px: 3 }}>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: activity.type === 'webinar' ? '#eff6ff' : '#ecfdf5', color: activity.type === 'webinar' ? '#3b82f6' : '#10b981' }}>
                          {activity.type === 'webinar' ? <PlayCircleOutlineIcon /> : <RateReviewIcon />}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ fontWeight: 700, color: '#0f172a' }}
                        secondaryTypographyProps={{ component: 'div' }}
                        primary={activity.title}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">{activity.date}</Typography>
                            <Typography variant="caption" color="text.secondary">•</Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{activity.type}</Typography>
                          </Box>
                        }
                      />
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle1" fontWeight={800} color="primary.main">+{activity.credits}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{activity.cat}</Typography>
                      </Box>
                    </ListItem>
                    {index < activities.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <Button color="primary" sx={{ textTransform: 'none', fontWeight: 600 }}>View Complete History</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
