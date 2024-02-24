import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Box, Button, Card, Divider, TextField, Typography, Grid } from '@mui/material';

function EditPopupItem({ handleEditDialogClose, handleEditItem, selectedItem }) {
  const [changedData, setChangedData] = useState({});

  const [initialData, setInitialData] = useState(selectedItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInitialData({ ...initialData, [name]: value });
    setChangedData({ ...changedData, [name]: value });
  };

  const handleEditTrigger = () => {
    handleEditItem(changedData);
  };

  return (
    <Card sx={{ p: '0.75rem' }}>
      <Typography variant="subtitle1">Edit Item Details : </Typography>
      <Divider />
      <Box sx={{ mt: '1rem' }}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Category Name"
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Category Name"
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Category Name"
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Category Name"
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Category Name"
              onChange={handleInputChange}
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.5rem',
            mt: '1rem',
          }}
        >
          <Button sx={{ color: 'warning.contrastText' }} onClick={handleEditDialogClose}>
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

export default EditPopupItem;

EditPopupItem.propTypes = {
  handleEditDialogClose: PropTypes.func,
  handleEditItem: PropTypes.func,
  selectedItem: PropTypes.object,
};
