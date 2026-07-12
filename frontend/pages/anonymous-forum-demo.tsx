import React, { useState } from 'react';
import {
  Box, Typography, Grid, Paper, Chip, Avatar, Button, Divider, TextField, FormControlLabel, Switch
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ForumIcon from '@mui/icons-material/Forum';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedIcon from '@mui/icons-material/Verified';
import Navbar from '../components/Navbar';

export default function AnonymousForumDemo() {
  const [postText, setPostText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const posts = [
    {
      id: 1,
      author: 'Anonymous PGY-1',
      avatarColor: '#94a3b8',
      verifiedLevel: 'Verified Resident',
      time: '2 hours ago',
      title: 'How do you actually dose Vancomycin without consulting pharmacy every time?',
      content: 'I know it’s weight-based, but every time I try to calculate a loading dose and frequency for a patient with wonky renal function, I feel like I’m guessing. I’m terrified of causing AKI. Is there a simple rule of thumb?',
      replies: [
        {
          author: 'Dr. Michael Chen',
          verifiedLevel: 'Attending - Infectious Disease',
          avatar: 'MC',
          text: 'Never feel bad about asking this! Pharmacy is your best friend, but a quick and dirty rule: 15-20 mg/kg actual body weight. If CrCl is >50, usually Q12H. If CrCl 20-49, Q24H. Anything less, you give one dose and check a random level in 24 hours. Always re-check troughs before the 4th dose.'
        }
      ]
    },
    {
      id: 2,
      author: 'Anonymous MS3',
      avatarColor: '#cbd5e1',
      verifiedLevel: 'Verified Med Student',
      time: '5 hours ago',
      title: 'I broke sterile field today and the scrub tech yelled at me in front of everyone.',
      content: 'I accidentally brushed my gown against the unsterile mayo stand cover. The tech lost her mind and the attending just sighed. I feel completely incompetent and don’t want to go back tomorrow. How do you recover from this?',
      replies: [
        {
          author: 'Anonymous PGY-3',
          verifiedLevel: 'Verified Resident - Surgery',
          avatar: 'A3',
          text: 'We have ALL done this. Literally every single surgeon has broken scrub as a medical student. The tech yelled because patient safety is paramount, not because they hate you. Show up tomorrow, double glove, keep your hands locked in the sterile triangle, and say "thank you for catching that yesterday." You will be fine!'
        }
      ]
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
      <Navbar />
      
      {/* Header */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', pt: 12, pb: 4, mb: 4, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
          <Chip icon={<SecurityIcon />} label="Safe Space • Strictly Moderated" color="warning" size="small" sx={{ mb: 2, fontWeight: 800, bgcolor: '#f59e0b', color: '#fff' }} />
          <Typography variant="h4" fontWeight={800} sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <VisibilityOffIcon fontSize="large" sx={{ opacity: 0.8 }} />
            "No Judgment" Clinical Forum
          </Typography>
          <Typography variant="subtitle1" color="#94a3b8" sx={{ maxWidth: 700 }}>
            A secure environment for medical students and interns to ask basic clinical or procedural questions without fear of judgment. Your verified status remains, but your identity is hidden.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', px: 3 }}>
        
        {/* Create Post Widget */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white', mb: 5 }}>
          <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mb: 2 }}>Ask a Question</Typography>
          <TextField 
            fullWidth multiline rows={3} 
            placeholder="What clinical scenario or procedure are you struggling to understand?" 
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            sx={{ mb: 2, bgcolor: '#f8fafc', '& fieldset': { borderColor: '#e2e8f0' } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={<Switch checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} color="primary" />}
              label={
                <Typography variant="body2" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: isAnonymous ? 'primary.main' : 'text.secondary' }}>
                  <VisibilityOffIcon fontSize="small" /> Post Anonymously
                </Typography>
              }
            />
            <Button variant="contained" disabled={!postText} sx={{ px: 4, py: 1, fontWeight: 700, borderRadius: 2 }}>
              Post Question
            </Button>
          </Box>
          {isAnonymous && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Your identity will be hidden, but a "Verified [Role]" badge will still be attached to prevent spam.
            </Typography>
          )}
        </Paper>

        {/* Forum Feed */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {posts.map((post) => (
            <Paper key={post.id} elevation={0} sx={{ p: 4, borderRadius: 4, border: '1px solid #e2e8f0', bgcolor: 'white' }}>
              
              {/* Question */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar sx={{ bgcolor: post.avatarColor, color: 'white' }}><VisibilityOffIcon /></Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight={800} color="#0f172a" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {post.author}
                    <Chip label={post.verifiedLevel} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem', fontWeight: 700, color: '#64748b', borderColor: '#cbd5e1' }} />
                  </Typography>
                  <Typography variant="caption" color="text.disabled">{post.time}</Typography>
                </Box>
              </Box>

              <Typography variant="h6" fontWeight={800} color="#0f172a" sx={{ mb: 1.5 }}>{post.title}</Typography>
              <Typography variant="body1" color="#334155" lineHeight={1.6} sx={{ mb: 3 }}>{post.content}</Typography>

              <Divider sx={{ mb: 3 }} />

              {/* Replies */}
              <Typography variant="subtitle2" fontWeight={800} color="#64748b" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ForumIcon fontSize="small" /> Top Replies
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pl: { xs: 2, sm: 4 }, borderLeft: '2px solid #f1f5f9' }}>
                {post.replies.map((reply, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                    <Avatar sx={{ bgcolor: reply.author.includes('Anonymous') ? '#cbd5e1' : '#eff6ff', color: reply.author.includes('Anonymous') ? 'white' : '#1d4ed8', width: 32, height: 32, fontSize: '0.9rem' }}>
                      {reply.author.includes('Anonymous') ? <VisibilityOffIcon fontSize="small" /> : reply.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1, bgcolor: '#f8fafc', p: 2.5, borderRadius: 3, border: '1px solid #e2e8f0' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight={800} color="#0f172a">{reply.author}</Typography>
                        {reply.author.includes('Dr.') && <VerifiedIcon color="primary" sx={{ width: 14, height: 14 }} />}
                        <Chip label={reply.verifiedLevel} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700 }} />
                      </Box>
                      <Typography variant="body2" color="#334155" lineHeight={1.6}>{reply.text}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

            </Paper>
          ))}
        </Box>

      </Box>
    </Box>
  );
}
