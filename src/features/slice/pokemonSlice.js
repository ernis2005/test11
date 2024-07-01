import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Api } from '../../services/api';
import axios from 'axios';

const initialState = {
  pokemons: [],
  pokemon: {},
  types: [],
  status: null,
  error: null,
};

export const getPokemons = createAsyncThunk(
  'pokemon/getPokemons',
  async pageIndex => {
    const response = await axios.get(
      `${Api}pokemon?limit=${pageIndex.limit}&offset=${pageIndex.offset}`,
    );
    const pokemonData = await Promise.all(
      response.data.results.map(async pokemon => {
        const details = await axios.get(pokemon.url);
        return {
          id: details.data.id,
          name: details.data.name,
          avatar: details.data.sprites.front_default,
          types: details.data.types.map(typeInfo => typeInfo.type.name),
          url: pokemon.url,
        };
      }),
    );
    return pokemonData;
  },
);
export const getTypes = createAsyncThunk('pokemon/getTypes', async () => {
  const response = await axios.get(`${Api}type`);
  return response.data.results;
});

export const getPokemonsById = createAsyncThunk(
  'pokemon/getPokemonsById',
  async id => {
    const response = await axios.get(Api + `pokemon/${id}`);
    return response.data;
  },
);
export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPokemons.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(getTypes.pending, state => {
        state.status = 'loading';
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.types = action.payload;
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(getPokemonsById.pending, state => {
        state.status = 'loading';
      })
      .addCase(getPokemonsById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemon = action.payload;
      })
      .addCase(getPokemonsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;

export const selectPokemons = state => state.pokemon.pokemons;
