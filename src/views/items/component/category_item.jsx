import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Box } from '@mui/material';

function CategoryItem({ name, index }) {
  return (
    <Box sx={{ m: 1 }}>
      <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
        {index + 1}. {name || ''}
      </Typography>
    </Box>
  );
}

export default CategoryItem;
CategoryItem.propTypes = {
  name: PropTypes.string,
  index: PropTypes.string,
};
