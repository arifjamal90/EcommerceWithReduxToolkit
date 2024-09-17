import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getApi = createAsyncThunk("counter/getApi", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
});

const CardSlice = createSlice({
  name: "counter",
  initialState: {
    loading: false,
    error: null,
    data: [],
    addItems: [],
  },
  reducers: {
    addItems: (state, action) => {
      const existingItem = state.addItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.addItems.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementItemQuantity: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.addItems.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state.addItems[itemIndex].quantity += 1;
      }
    },
    removeItems: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.addItems.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1 && state.addItems[itemIndex].quantity > 1) {
        state.addItems[itemIndex].quantity -= 1;
      } else {
        state.addItems = state.addItems.filter((item) => item.id !== itemId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addItems, removeItems, incrementItemQuantity } =
  CardSlice.actions;
export default CardSlice.reducer;
