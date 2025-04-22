// src/redux/cartSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({id: itemId, quantity: 1});
      }
    },
    subtractItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity--;
        if (existingItem.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number}>
    ) => {
      const {id, quantity} = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const {addItem, removeItem, updateQuantity, subtractItem} = cartSlice.actions;
export default cartSlice.reducer;
