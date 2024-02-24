import React, { useState } from 'react';

import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function EditPopupItem({
  handleEditDialogClose,
  handleEditItem,
  selectedItem,
  handleEditItemImage,
}) {
  const [changedData, setChangedData] = useState({});

  const [initialData, setInitialData] = useState(selectedItem);
  const [itemImage, setItemImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setItemImage(file);
    setInitialData({ ...initialData, imageLink: URL.createObjectURL(file) });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInitialData({ ...initialData, [name]: value });
    setChangedData({ ...changedData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setInitialData({ ...initialData, [name]: checked });
    setChangedData({ ...changedData, [name]: checked });
  };

  const handleEditTrigger = () => {
    if (!changedData) return;
    handleEditItem(changedData);
  };

  return (
    <Card sx={{ p: '0.75rem' }}>
      <Typography variant="subtitle1">Edit Item Details : </Typography>
      <Divider />
      <Box sx={{ mt: '1rem' }}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12} sm={6}>
            <img
              src={initialData?.imageLink || ''}
              alt={initialData?.name || 'Not Found'}
              style={{ width: '8rem', height: '6rem', borderRadius: '1rem' }}
            />
            <TextField
              type="file"
              variant="outlined"
              name="name"
              size="small"
              sx={{ my: '0.5rem' }}
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
            <Button
              variant="contained"
              sx={{
                position: { sm: 'absolute' },
                bottom: '0.5rem',
                backgroundColor: 'info.darker',
              }}
              disabled={!itemImage}
              onClick={() => handleEditItemImage(itemImage)}
            >
              Change Image
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>{' '}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Item Name"
              name="name"
              value={initialData?.name || ''}
              onChange={handleInputChange}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              variant="outlined"
              label="Price"
              name="price"
              value={initialData?.price || ''}
              onChange={handleInputChange}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Description"
              name="description"
              value={initialData?.description || ''}
              onChange={handleInputChange}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Android12Switch
                  name="isAvailable"
                  checked={initialData?.flags?.isAvailable || false}
                  onChange={handleCheckboxChange}
                />
              }
              label="Availablity"
              sx={{ ml: '0rem' }}
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
  handleEditItemImage: PropTypes.func,
};
