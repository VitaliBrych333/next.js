'use client'

import { createSlice } from '@reduxjs/toolkit';

type StateProp = {
  showAddModal: boolean,
  showEditModal: boolean,
  showDeleteModal: boolean
};

const initialState: StateProp = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false
};

const modalWindowSlice = createSlice({
  name: 'modal-window',
  initialState,
  reducers: { 
    SET_SHOW_ADD_MODAL: (state, action) => {
      state.showAddModal = action.payload;
    },
    SET_SHOW_EDIT_MODAL: (state, action) => {
      state.showEditModal = action.payload;
    },
    SET_SHOW_DELETE_MODAL: (state, action) => {
      state.showDeleteModal = action.payload;
    }
  }  
});

export default modalWindowSlice.reducer;
export const { SET_SHOW_ADD_MODAL, SET_SHOW_EDIT_MODAL, SET_SHOW_DELETE_MODAL } = modalWindowSlice.actions;