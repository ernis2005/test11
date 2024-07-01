import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../services/api';
import axios from 'axios';

const initialState = {
  searchPokemons: [],
  status: null,
  error: null,
};
export const getPokemonsByName = createAsyncThunk(
  'pokemon/getPokemonsByName',
  async name => {
    const response = await axios.get(`${Api}pokemon/${name}`);
    return response.data;
  },
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getPokemonsByName.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPokemonsByName.fulfilled, (state, action) => {
        state.status = 'success';
        state.searchPokemons = action.payload;
      })
      .addCase(getPokemonsByName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
