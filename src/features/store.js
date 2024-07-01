import { configureStore } from '@reduxjs/toolkit';
import pokemonSlice from './slice/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
  },
});
