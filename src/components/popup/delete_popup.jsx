import React from 'react';

import PropTypes from 'prop-types';

import { Box, Button, Card, Divider, Typography } from '@mui/material';

function DeletePopup({ handleDeleteClick, handleCloseClick, deleteMessage }) {
  return (
    <Card sx={{ p: '0.75rem' }}>
      <Typography variant="subtitle1">Confirm Delete</Typography>
      <Divider />
      <Box sx={{ mt: '0.5rem' }}>
        <Typography variant="subtitle2">Are sure you want to delete ? {deleteMessage}</Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
          <Button sx={{ color: 'warning.contrastText' }} onClick={handleCloseClick}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: 'error.dark',
              color: 'white',
              '&:hover': {
                backgroundColor: 'error.darker',
              },
            }}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default DeletePopup;

DeletePopup.propTypes = {
  handleCloseClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  deleteMessage: PropTypes.string,
};
