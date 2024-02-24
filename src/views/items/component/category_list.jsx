import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Card, IconButton, Divider, Dialog, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { deleteCategoryById, editCategoryById, fetchCategoryListAsync } from 'src/redux/menuSlice';

import DeletePopup from 'src/components/popup/delete_popup';
import CategoryItem from './category_item';
import EditPopupCategory from './edit_popup_category';

function CategoryList({ selectedCategoryId, setSelectedCategoryId }) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.menu.categoryList);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('all');

  useEffect(() => {
    dispatch(fetchCategoryListAsync());
  }, [dispatch]);

  function filterCategoryItem(id, name) {
    setSelectedCategoryId(id);
    setSelectedCategoryName(name);
  }

  // Close Delete Dialog
  const handleDeleteDialogClose = () => {
    setSelectedCategoryId(null);
    setOpenDeleteDialog(false);
  };
  // Close Edit Dialog
  const handleEditDialogClose = () => {
    setSelectedCategoryId(null);
    setOpenEditDialog(false);
  };

  // Delete Selected Category Item
  const handleDeleteCategoryItem = () => {
    console.log('delete category id', selectedCategoryId);
    setOpenDeleteDialog(true);
    dispatch(deleteCategoryById({ categoryId: selectedCategoryId })).then((res) => {
      if (deleteCategoryById.fulfilled.match(res)) {
        handleDeleteDialogClose();
      }
    });
  };

  // Edit Selected Category Item
  const handleEditCategoryItem = (categoryName) => {
    dispatch(editCategoryById({ categoryId: selectedCategoryId, name: categoryName })).then(
      (res) => {
        if (editCategoryById.fulfilled.match(res)) {
          handleEditDialogClose();
        }
      }
    );
    // setOpenEditDialog(false);
  };

  return (
    <Box
      sx={{
        maxHeight: '80vh',
        minWidth: '12rem',
        maxWidth: { xs: '100%', sm: '20rem' },
        width: '100%',
        backgroundColor: 'white',
        p: 2,
        borderRadius: '0.5rem',
        overflow: 'auto',
      }}
      className="no__scrollbar"
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.1rem' }}
      >
        Cateogory List
      </Typography>
      <Divider />
      <Box
        sx={{
          my: '1rem',
          overflow: 'auto',
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' },
        }}
      >
        {categoryList?.map((category, index) => (
          <Card
            key={category._id}
            sx={{
              backgroundColor: selectedCategoryName === category?.name ? '#F3F6F4' : 'white',

              position: 'relative',
              height: '4rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              minWidth: '10rem',
            }}
            onClick={() => filterCategoryItem(category?._id, category?.name)}
          >
            <CategoryItem name={category?.name} index={index} />
            {selectedCategoryId === category._id && (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton onClick={() => setOpenDeleteDialog(true)}>
                  <DeleteIcon sx={{ width: '1rem', height: '1rem' }} />
                </IconButton>
                <IconButton onClick={() => setOpenEditDialog(true)}>
                  <EditIcon sx={{ width: '1rem', height: '1rem' }} />
                </IconButton>
              </Box>
            )}
          </Card>
        ))}
      </Box>
      <Dialog open={openDeleteDialog} maxWidth="xs" fullWidth sx={{ padding: '0' }}>
        <DialogContent sx={{ p: '0.5rem' }}>
          <DeletePopup
            deleteMessage="You need to delete all the items under this category."
            handleDeleteClick={handleDeleteCategoryItem}
            handleCloseClick={handleDeleteDialogClose}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openEditDialog} maxWidth="xs" fullWidth sx={{ padding: '0' }}>
        <DialogContent sx={{ p: '0.5rem' }}>
          <EditPopupCategory
            handleEditClick={handleEditCategoryItem}
            handleCloseClick={handleEditDialogClose}
            selectedCategoryName={selectedCategoryName}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default CategoryList;

CategoryList.propTypes = {
  selectedCategoryId: PropTypes.any,
  setSelectedCategoryId: PropTypes.func,
};
