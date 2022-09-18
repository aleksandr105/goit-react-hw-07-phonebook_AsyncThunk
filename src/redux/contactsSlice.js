import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addItem(state, action) {
      state.push(action.payload);
    },
    delContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addItem, delContact } = contactsSlice.actions;
