import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store/store';
import { DogBreed } from '../../types/general';

interface GlobalState {
  username: string,
  favorites: string[],
  allDogs: DogBreed[],
}

const initialState: GlobalState = {
  username: 'John Doe',
  favorites: [],
  allDogs: []
};

export const fetchDogs = createAsyncThunk(
  'dogs/fetchByBreed',
  async (count: number, thunkAPI) => {
    const res = await fetch(`https://api.TheDogAPI.com/v1/breeds?limit=${count}&page=6&order=Desc`)
    return (await res.json()) as DogBreed[]
  }
)

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addFav: (state, action: PayloadAction<string>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFav: (state, action: PayloadAction<string>) => {
      let currentFavs = state.favorites;
      currentFavs.splice(currentFavs.indexOf(action.payload), 1)
      state.favorites = [...currentFavs];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchDogs.fulfilled, (state, action) => {
      // Add user to the state array
      state.allDogs = [...action.payload];
    })
  },
});

export const { addFav, removeFav } = globalSlice.actions;

export const getUsername = (state: RootState) => state.global.username;
export const getFavs = (state: RootState) => state.global.favorites;
export const getAllDogs = (state: RootState) => state.global.allDogs;

export default globalSlice.reducer;
