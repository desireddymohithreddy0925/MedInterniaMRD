import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Avatar, Button, Divider, InputAdornment, TextField
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VerifiedIcon from '@mui/icons-material/Verified';
import Navbar from '../components/Navbar';

export default function CareersDemo() {
  const [search, setSearch] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Interventional Cardiology Fellowship',
      institution: 'Johns Hopkins Hospital',
      location: 'Baltimore, MD',
      type: 'Fellowship',
      salary: 'PGY-7 Stipend',
      posted: '2 days ago',
      verified: true,
      logo: 'JH',
      description: 'One-year ACGME-accredited fellowship focused on complex coronary interventions, structural heart disease, and peripheral vascular disease. Seeking highly motivated candidates completing general cardiology.'
    },
    {
      id: 2,
      title: 'Attending Physician - Emergency Medicine',
      institution: 'Mayo Clinic',
      location: 'Rochester, MN',
      type: 'Attending',
      salary: '$320k - $380k',
      posted: '5 hours ago',
      verified: true,
      logo: 'MC',
      description: 'Join a world-class Level 1 Trauma center. Flexible scheduling (120 hours/month), robust academic opportunities, and comprehensive benefits package.'
    },
    {
      id: 3,
      title: 'Internal Medicine Residency (PGY-1 categorical)',
      institution: 'Massachusetts General Hospital',
      location: 'Boston, MA',
      type: 'Residency Slot',
      salary: 'PGY-1 Stipend',
      posted: '1 week ago',
      verified: true,
      logo: 'MG',
      description: 'Unexpected opening for a categorical PGY-1 resident starting July 2026. Applicants must have passed USMLE Step 1 and Step 2 CK.'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', pt: 12, pb: 4, mb: 4 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Chip label="MedInternia Careers" color="primary" size="small" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
            Find Your Next Clinical Role
          </Typography>
          <Typography variant="subtitle1" color="#94a3b8" sx={{ mb: 4, maxWidth: 600 }}>
            Apply directly to verified open residency slots, fellowships, and attending positions using your MedInternia clinical portfolio.
          </Typography>

          <Paper elevation={0} sx={{ p: 1, display: 'flex', alignItems: 'center', borderRadius: 2 }}>
            <TextField 
              fullWidth
              placeholder="Search by specialty, role, or institution..."
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ '& fieldset': { border: 'none' } }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
              }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Button variant="contained" sx={{ px: 4, py: 1, fontWeight: 700, borderRadius: 1.5 }}>Search</Button>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Grid container spacing={4}>
          {/* Sidebar Filters */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2, color: '#0f172a' }}>Filters</Typography>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, color: '#334155' }}>Role Type</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                <Chip label="Fellowship" variant="outlined" color="primary" onClick={() => {}} />
                <Chip label="Residency Slot" variant="outlined" onClick={() => {}} />
                <Chip label="Attending" variant="outlined" onClick={() => {}} />
              </Box>
              
              <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1.5, color: '#334155' }}>Specialty</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip label="Cardiology" variant="outlined" onClick={() => {}} />
                <Chip label="Emergency Medicine" variant="outlined" onClick={() => {}} />
                <Chip label="Internal Medicine" variant="outlined" onClick={() => {}} />
                <Chip label="Surgery" variant="outlined" onClick={() => {}} />
              </Box>
            </Paper>
          </Grid>

          {/* Job Listings */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2, color: '#0f172a' }}>Top Opportunities</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {jobs.map((job) => (
                <Paper key={job.id} elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white', transition: 'all 0.2s', '&:hover': { borderColor: 'primary.main', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' } }}>
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: '#f1f5f9', color: '#1e293b', fontWeight: 800, fontSize: '1.2rem' }}>
                      {job.logo}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                        <Typography variant="h6" fontWeight={800} color="#0f172a">{job.title}</Typography>
                        <Chip label={job.type} size="small" sx={{ fontWeight: 800, bgcolor: job.type === 'Attending' ? '#dcfce7' : '#eff6ff', color: job.type === 'Attending' ? '#166534' : '#1d4ed8' }} />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight={700} color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocalHospitalIcon fontSize="small" /> {job.institution}
                          {job.verified && <VerifiedIcon fontSize="small" color="primary" sx={{ width: 14, height: 14 }} />}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOnIcon fontSize="small" /> {job.location}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <WorkOutlineIcon fontSize="small" /> {job.salary}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="#475569" sx={{ mb: 3, lineHeight: 1.6 }}>
                        {job.description}
                      </Typography>

                      <Divider sx={{ mb: 2 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.disabled" fontWeight={600}>
                          Posted {job.posted}
                        </Typography>
                        <Button variant="contained" size="small" sx={{ fontWeight: 700, px: 3, borderRadius: 2 }}>
                          Apply with MedInternia Profile
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}
