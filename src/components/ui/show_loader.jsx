import React from 'react';

import { Box } from '@mui/material';
import { LineWave } from 'react-loader-spinner';

function ShowLoader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <LineWave
        visible
        height="100"
        width="100"
        color="#ffb433"
        ariaLabel="line-wave-loading"
        wrapperStyle={{}}
        wrapperClass=""
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
      />
    </Box>
  );
}

export default ShowLoader;
