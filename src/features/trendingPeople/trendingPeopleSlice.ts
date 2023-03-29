import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Trending, InitialTPeople } from "../../common/types/typesTS";

const initialState: InitialTPeople = {
  isLoading: true,
  trendingPeople: [],
};

export const getTrendingPeople = createAsyncThunk(
  "trendingPeople/getTrending",
  async (data, thunkAPI) => {
    try {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&adult=false`
      );
      return resp.data.results;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const trendingPeopleSlice = createSlice({
  name: "trendingPeople",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingPeople.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getTrendingPeople.fulfilled,
        (state, action: PayloadAction<Trending[]>) => {
          state.isLoading = false;
          state.trendingPeople = action.payload;
        }
      )
      .addCase(getTrendingPeople.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { reducer } = trendingPeopleSlice;
