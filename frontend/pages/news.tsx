import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Avatar, Button, Tabs, Tab
} from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Navbar from '../components/Navbar';

export default function NewsFeed() {
  const [tabIndex, setTabIndex] = useState(0);

  const newsItems = [
    {
      id: 1,
      source: 'American Heart Association',
      sourceInitials: 'AHA',
      sourceColor: '#ef4444',
      title: '2026 ACC/AHA/SCAI Guidelines for Coronary Artery Revascularization',
      summary: 'Updated recommendations on the role of PCI and CABG in patients with complex coronary artery disease, incorporating new trial data from 2025.',
      category: 'Guidelines',
      date: '2 hours ago',
      tags: ['Cardiology', 'Surgery']
    },
    {
      id: 2,
      source: 'New England Journal of Medicine',
      sourceInitials: 'NEJM',
      sourceColor: '#0369a1',
      title: 'Efficacy of Next-Gen GLP-1 Agonists in Non-Diabetic Obesity',
      summary: 'A randomized, double-blind trial demonstrating significant long-term weight reduction and cardiovascular benefit profiles in patients without type 2 diabetes.',
      category: 'Clinical Trials',
      date: '5 hours ago',
      tags: ['Endocrinology', 'Internal Medicine']
    },
    {
      id: 3,
      source: 'Centers for Disease Control',
      sourceInitials: 'CDC',
      sourceColor: '#1d4ed8',
      title: 'Revised Protocols for Novel Influenza Strain Management',
      summary: 'Immediate advisory on isolation procedures and antiviral administration windows for the newly identified H7N4 variant.',
      category: 'Public Health',
      date: '1 day ago',
      tags: ['Infectious Disease', 'Emergency Med']
    },
    {
      id: 4,
      source: 'JAMA Oncology',
      sourceInitials: 'JAMA',
      sourceColor: '#7e22ce',
      title: 'Immunotherapy Sequencing in Stage IV Melanoma',
      summary: 'Retrospective cohort study analyzing overall survival rates based on the sequence of PD-1 and CTLA-4 inhibitor administration.',
      category: 'Research',
      date: '2 days ago',
      tags: ['Oncology', 'Dermatology']
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header Banner */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e2e8f0', pt: 6, pb: 2, mb: 4 }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2, color: '#0f172a' }}>
            <FeedIcon fontSize="large" color="primary" />
            News & Clinical Guidelines
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Aggregated updates from major medical journals and societies, tailored to your specialties.
          </Typography>

          <Tabs 
            value={tabIndex} 
            onChange={(_, newValue) => setTabIndex(newValue)}
            sx={{
              '& .MuiTab-root': { fontWeight: 700, textTransform: 'none', fontSize: '1rem', color: '#64748b' },
              '& .Mui-selected': { color: '#0f172a' },
              '& .MuiTabs-indicator': { bgcolor: 'primary.main', height: 3 }
            }}
          >
            <Tab label="For You" />
            <Tab label="Guidelines" />
            <Tab label="Clinical Trials" />
            <Tab label="Public Health" />
          </Tabs>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
        <Grid container spacing={4}>
          
          {/* Main Feed */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {newsItems.map((item) => (
                <Paper key={item.id} elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', transition: 'all 0.2s', '&:hover': { borderColor: '#cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: item.sourceColor, fontSize: '0.8rem', fontWeight: 800 }}>
                        {item.sourceInitials}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={700} color="#0f172a">{item.source}</Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>{item.date}</Typography>
                      </Box>
                    </Box>
                    <Chip label={item.category} size="small" sx={{ fontWeight: 700, bgcolor: '#f1f5f9', color: '#475569' }} />
                  </Box>
                  
                  <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mb: 1.5, lineHeight: 1.3 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {item.summary}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {item.tags.map(tag => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontWeight: 600, color: 'primary.main', borderColor: 'primary.100', bgcolor: 'primary.50' }} />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}><BookmarkBorderIcon fontSize="small" /></IconButton>
                      <Button endIcon={<OpenInNewIcon />} sx={{ textTransform: 'none', fontWeight: 700 }}>Read Full</Button>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white', mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={800} color="#0f172a" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalHospitalIcon color="primary" /> My Specialties
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="Cardiology" color="primary" sx={{ fontWeight: 600 }} />
                <Chip label="Internal Medicine" color="primary" sx={{ fontWeight: 600 }} />
                <Chip label="Emergency Med" variant="outlined" sx={{ fontWeight: 600 }} />
              </Box>
              <Button fullWidth variant="outlined" sx={{ mt: 3, textTransform: 'none', fontWeight: 700 }}>
                Edit Preferences
              </Button>
            </Paper>

            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
               <Typography variant="subtitle2" fontWeight={800} color="#0f172a" sx={{ mb: 2 }}>
                Trending This Week
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 600, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                FDA Approves New Targeted Therapy for Advanced Non-Small Cell Lung Cancer
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                Revised Blood Pressure Thresholds for High-Risk Surgical Patients
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}
