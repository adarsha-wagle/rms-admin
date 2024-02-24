import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Dialog, DialogContent, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  deleteFoodItemById,
  fetchFoodItemListAsync,
  editFoodItemById,
  editFoodItemImageById,
} from 'src/redux/menuSlice';

// import { compressImage } from 'src/utils/image_compressor';

import FoodCard from 'src/components/cards/food_card';
import DeletePopup from 'src/components/popup/delete_popup';
import EditPopupItem from './edit_popup_item';

function ItemList({ selectedCategoryId }) {
  const dispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const foodItemList = useSelector((state) => state.menu.foodItemList);

  useEffect(() => {
    dispatch(fetchFoodItemListAsync({ categoryId: selectedCategoryId }));
  }, [dispatch, selectedCategoryId]);

  // Set Selected Id and Open item delete dialog
  const handleDeleteDialogOpen = (item) => {
    setSelectedItem(item);
    setOpenDeleteDialog(true);
  };
  // Set Selected Id and Open item edit dialog
  const handleEditDialogOpen = (item) => {
    setSelectedItem(item);
    setOpenEditDialog(true);
  };

  // Set Selected Id to null and Close Edit Dialog
  const handleEditDialogClose = () => {
    setSelectedItem(null);
    setOpenEditDialog(false);
  };
  // Set Selected Id to null and Close Delete Dialog
  const handleDeleteDialogClose = () => {
    setSelectedItem(null);
    setOpenDeleteDialog(false);
  };

  // Delete Selected Category Item
  const handleDeleteItem = () => {
    console.log('delete category id', selectedItem);
    dispatch(deleteFoodItemById({ foodItemId: selectedItem?._id })).then((res) => {
      if (deleteFoodItemById.fulfilled.match(res)) {
        handleDeleteDialogClose();
      }
    });
  };

  // Edit Selected Category Item // todo call api
  const handleEditItem = (changedData) => {
    console.log('edit category id', selectedItem);
    console.log('changed data', changedData);

    dispatch(editFoodItemById({ foodItemId: selectedItem?._id, changedData })).then((res) => {
      if (editFoodItemById.fulfilled.match(res)) {
        handleEditDialogClose();
      }
    });
    // setOpenEditDialog(false);
  };

  // Edit Selected Category Image
  const handleEditItemImage = (itemImage) => {
    console.log('item image', itemImage);
    try {
      // todo show promise toast
      // const compressedImage = compressImage(itemImage);
      const formData = new FormData();

      formData.append('image', itemImage);
      dispatch(editFoodItemImageById({ formData, foodItemId: selectedItem._id })).then((res) => {
        if (editFoodItemImageById.fulfilled.match(res)) {
          console.log('Image edited'); // todo
        }
      });
    } catch (err) {
      console.error('Image Compression Error', err);
    }
  };

  return (
    <Box sx={{ height: '80vh', flexGrow: '1', overflow: 'auto' }} className="no__scrollbar">
      <Grid container sx={{ mt: 4 }} justifyContent="flex-start" alignContent="flex-start">
        {foodItemList.map((foodItem, index) => (
          <Grid
            item
            key={foodItem._id}
            xs={12}
            md={6}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}
          >
            <FoodCard
              imagePreview={foodItem?.imageLink || ''}
              description={foodItem?.description || ''}
              price={foodItem?.price || ''}
              foodName={foodItem?.name || ''}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <IconButton onClick={() => handleDeleteDialogOpen(foodItem)}>
                <DeleteIcon sx={{ width: '1rem', height: '1rem' }} />
              </IconButton>
              <IconButton onClick={() => handleEditDialogOpen(foodItem)}>
                <EditIcon sx={{ width: '1rem', height: '1rem' }} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDeleteDialog} maxWidth="xs" fullWidth sx={{ padding: '0' }}>
        <DialogContent sx={{ p: '0.5rem' }}>
          <DeletePopup
            handleDeleteClick={handleDeleteItem}
            handleCloseClick={handleDeleteDialogClose}
            deleteMessage={selectedItem?.name || ''}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openEditDialog} maxWidth="sm" fullWidth sx={{ padding: '0' }}>
        <DialogContent sx={{ p: '0.5rem' }}>
          <EditPopupItem
            handleEditDialogClose={handleEditDialogClose}
            handleEditItem={handleEditItem}
            selectedItem={selectedItem}
            handleEditItemImage={handleEditItemImage}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ItemList;

ItemList.propTypes = {
  selectedCategoryId: PropTypes.any,
};
