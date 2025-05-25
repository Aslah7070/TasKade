
"use client"
import React from 'react';
import { Box, Typography, Link, Container, Stack } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.100', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'flex-start' }}
        >
          {/* Section 1: About */}
          <Box>
            <Typography variant="h6" gutterBottom>
              My Habits
            </Typography>
            <Typography variant="body2">
              Track and build your daily habits for a better lifestyle.
            </Typography>
          </Box>

          {/* Section 2: Quick Links */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="hover" display="block">Home</Link>
              <Link href="/dashboard" color="inherit" underline="hover" display="block">Dashboard</Link>
              <Link href="/about" color="inherit" underline="hover" display="block">About</Link>
            </Box>
          </Box>

          {/* Section 3: Contact */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Connect
            </Typography>
            <Typography variant="body2">Email: support@myhabits.com</Typography>
            <Typography variant="body2">© {new Date().getFullYear()} My Habits</Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
