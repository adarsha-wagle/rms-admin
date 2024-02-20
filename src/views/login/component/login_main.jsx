import React from 'react';

import { Box } from '@mui/material';

import LoginImage from './login_image';
import LoginForm from './login_form';

function LoginMain() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <LoginImage />
      </Box>
      <Box sx={{ flexGrow: '1' }}>
        <LoginForm />
      </Box>
    </Box>
  );
}

export default LoginMain;
