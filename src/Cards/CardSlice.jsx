import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getApi = createAsyncThunk("counter/getApi", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
});


export const searchApi = createAsyncThunk("counter/searchApi", async (searchItems) => {
  const response = await fetch(`https://dummyjson.com/products/search?q=${searchItems}`);
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
    searchItems: [], 
    add_cart_items:[],
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
    searchItem: (state, action) => {
      const searchValue = action.payload.toLowerCase();
      state.data = state.data.filter((user) =>
          user.category.toLowerCase().includes(searchValue)
      );
    },
    add_To_cart: (state, action) => {
      state.add_cart_items=state.searchItems.filter((current)=>{
        return current.id === action.payload.id 
      });
      
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
      })
      .addCase(searchApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchApi.fulfilled, (state, action) => {
        state.loading = false;
        state.searchItems = action.payload;
      })
      .addCase(searchApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addItems, removeItems, incrementItemQuantity, searchItem, add_To_cart } =
  CardSlice.actions;
export default CardSlice.reducer;
