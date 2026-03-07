import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  places: any[];
  favorites: string[];
  loading: boolean;
}

const initialState: AppState = {
  places: [],
  favorites: [],
  loading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
});

export const { setPlaces, addFavorite, removeFavorite } = appSlice.actions;

export default appSlice.reducer;
