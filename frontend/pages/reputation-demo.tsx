import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, IconButton, Chip, Avatar, Divider, Button, Tooltip
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Navbar from '../components/Navbar';

export default function ReputationDemo() {
  const [votes, setVotes] = useState({
    1: 42,
    2: -3,
    3: 15
  });
  
  const [userVotes, setUserVotes] = useState<Record<number, 'up' | 'down' | null>>({
    1: null,
    2: null,
    3: null
  });

  const handleVote = (id: number, type: 'up' | 'down') => {
    if (userVotes[id] === type) {
      setVotes(prev => ({ ...prev, [id]: prev[id] + (type === 'up' ? -1 : 1) }));
      setUserVotes(prev => ({ ...prev, [id]: null }));
    } else {
      const adjustment = userVotes[id] === null ? (type === 'up' ? 1 : -1) : (type === 'up' ? 2 : -2);
      setVotes(prev => ({ ...prev, [id]: prev[id] + adjustment }));
      setUserVotes(prev => ({ ...prev, [id]: type }));
    }
  };

  const reviews = [
    {
      id: 1,
      author: 'Dr. Emily Chen',
      specialty: 'Cardiology',
      reputation: 1450,
      badge: 'Top Reviewer',
      time: '2 hours ago',
      text: 'Given the patient\'s elevated troponins and ST depressions in V1-V3, this presentation is highly suspicious for a posterior STEMI. An isolated posterior MI can often present as NSTEMI on a standard 12-lead. I strongly recommend obtaining a 15-lead ECG to look for ST elevation in V7-V9 before proceeding with routine NSTEMI medical management.',
      accepted: true,
    },
    {
      id: 3,
      author: 'Dr. Marcus Webb',
      specialty: 'Internal Medicine',
      reputation: 840,
      badge: null,
      time: '4 hours ago',
      text: 'I agree with the concern for ischemia. In the meantime, ensure the patient is loaded with aspirin and a P2Y12 inhibitor, and consider a heparin drip while awaiting cardiology consult.',
      accepted: false,
    },
    {
      id: 2,
      author: 'Dr. John Smith',
      specialty: 'General Practice',
      reputation: 120,
      badge: null,
      time: '5 hours ago',
      text: 'Probably just reflux, give a GI cocktail and observe.',
      accepted: false,
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', pt: 12, pb: 4, mb: 4 }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
          <Chip label="Case Review" color="primary" size="small" sx={{ mb: 2, fontWeight: 700 }} />
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
            45M with atypical chest pain and normal initial ECG
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: '#3b82f6', fontSize: '0.8rem' }}>AJ</Avatar>
            <Typography variant="subtitle2" color="#cbd5e1">Posted by Dr. Aaron Jones • 6 hours ago</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: '#0f172a' }}>
          3 Peer Reviews
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {reviews.map((review) => (
            <Paper key={review.id} elevation={0} sx={{ display: 'flex', p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white', position: 'relative', overflow: 'hidden' }}>
              
              {/* Accepted Answer Highlight */}
              {review.accepted && (
                <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, bgcolor: 'success.main' }} />
              )}

              {/* Vote Sidebar */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 3, minWidth: 40 }}>
                <IconButton 
                  onClick={() => handleVote(review.id, 'up')}
                  sx={{ color: userVotes[review.id] === 'up' ? 'primary.main' : 'text.disabled', '&:hover': { color: 'primary.main', bgcolor: 'primary.50' } }}
                >
                  <ArrowUpwardIcon fontSize="medium" />
                </IconButton>
                <Typography variant="h6" fontWeight={800} color={votes[review.id] < 0 ? 'error.main' : '#0f172a'}>
                  {votes[review.id]}
                </Typography>
                <IconButton 
                  onClick={() => handleVote(review.id, 'down')}
                  sx={{ color: userVotes[review.id] === 'down' ? 'error.main' : 'text.disabled', '&:hover': { color: 'error.main', bgcolor: 'error.50' } }}
                >
                  <ArrowDownwardIcon fontSize="medium" />
                </IconButton>

                {review.accepted && (
                  <Tooltip title="Accepted by Original Poster" placement="right">
                    <CheckCircleIcon color="success" sx={{ mt: 2 }} />
                  </Tooltip>
                )}
              </Box>

              {/* Review Content */}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#eff6ff', color: '#1d4ed8', fontWeight: 800 }}>
                      {review.author.split(' ')[1][0]}
                    </Avatar>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" fontWeight={800} color="#0f172a">
                          {review.author}
                        </Typography>
                        <Chip label={review.specialty} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700 }} />
                        {review.badge && (
                          <Tooltip title="Top 5% of Reviewers in Cardiology">
                            <Chip icon={<WorkspacePremiumIcon />} label={review.badge} size="small" color="warning" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 800, bgcolor: '#fffbeb', color: '#b45309', border: '1px solid #fcd34d' }} />
                          </Tooltip>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600}>
                          {review.reputation} Reputation
                        </Typography>
                        <Typography variant="caption" color="text.disabled">•</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {review.time}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="body1" color="#334155" lineHeight={1.6}>
                  {review.text}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button size="small" sx={{ textTransform: 'none', fontWeight: 700, color: 'text.secondary' }}>Reply</Button>
                  <Button size="small" sx={{ textTransform: 'none', fontWeight: 700, color: 'text.secondary' }}>Share</Button>
                  <Button size="small" sx={{ textTransform: 'none', fontWeight: 700, color: 'text.secondary' }}>Report</Button>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
