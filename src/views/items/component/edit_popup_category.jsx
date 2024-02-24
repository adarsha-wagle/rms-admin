import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material';

function EditPopupCategory({ handleEditClick, handleCloseClick, selectedCategoryName }) {
  const [categoryName, setCategoryName] = useState(selectedCategoryName || '');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEditTrigger = () => {
    // Return if current value is empty
    if (!categoryName.trim()) {
      setErrorMessage('Must not be empty');
      setIsError(true);
      return;
    }
    // Return if previous and current value is same
    if (categoryName === selectedCategoryName) {
      setErrorMessage('No Changes Occur !');
      setIsError(true);
      return;
    }
    // Send Edit Request
    handleEditClick(categoryName);
  };

  return (
    <Card sx={{ p: '0.75rem' }}>
      <Typography variant="subtitle1">Edit Category Name : </Typography>
      <Divider />
      <Box sx={{ mt: '1rem' }}>
        <TextField
          error={isError}
          variant="outlined"
          label="Category Name"
          helperText={errorMessage}
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onFocus={() => {
            setIsError(false);
            setErrorMessage('');
          }}
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            mt: '1rem',
          }}
        >
          <Button sx={{ color: 'warning.contrastText' }} onClick={handleCloseClick}>
            Cancel
          </Button>
          <Button
            sx={{
              backgroundColor: 'grey.800',
              color: 'white',
              '&:hover': {
                backgroundColor: 'grey.700',
              },
            }}
            onClick={handleEditTrigger}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

export default EditPopupCategory;

EditPopupCategory.propTypes = {
  handleEditClick: PropTypes.func,
  handleCloseClick: PropTypes.func,
  selectedCategoryName: PropTypes.string,
};
