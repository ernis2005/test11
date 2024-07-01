import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './slice/pokemonSlice';
import searchSlice from './slice/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    pokemon: pokemonSlice,
  },
});
