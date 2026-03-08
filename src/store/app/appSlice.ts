import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  provincia: string;
}
interface FilterState {
  category: string | null;
}
interface AppState {
  categories: any[];
  places: any[];
  favorites: string[];
  loading: boolean;
  user: IUser;
  category: FilterState | null;
}

const initialState: AppState = {
  categories: [],
  places: [],
  favorites: [],
  loading: false,
  user: {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    provincia: '',
  },
  category: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setPlaces: (state, action) => {
      state.places = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    clearCategoryFilter: (state) => {
      state.category = null;
    },
  },
});

export const {
  setCategories,
  setPlaces,
  addFavorite,
  removeFavorite,
  addUser,
  setCategoryFilter,
  clearCategoryFilter,
} = appSlice.actions;

export default appSlice.reducer;
