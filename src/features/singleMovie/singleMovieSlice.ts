import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type MovieCollection = {
  id: number;
  backdrop_path: string;
  name: string;
  poster_path: string;
};

type GenresKeywords = {
  id: number;
  name: string;
};

type MovieCompanies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

type MovieCast = {
  id: number;
  character: string;
  known_for_department: string;
  name: string;
};

type MovieCrew = {
  id: number;
  department: string;
  job: string;
  name: string;
  profile_path: string;
};

type MovieCreditsType = {
  cast: MovieCast[];
  crew: MovieCrew[];
};

type MovieInfoType = {
  title: string;
  tagline: string;
  backdrop_path: string;
  belongs_to_collection: MovieCollection;
  genres: GenresKeywords[];
  budget: number;
  imdb_id: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieCompanies[];
  production_countries: [{ name: string }];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [{ english_name: string }];
  vote_average: number;
  credits: MovieCreditsType;
  keywords: {
    keywords: GenresKeywords[];
  };
};

type InitialStateType = {
  isLoading: boolean;
  movieInfo: MovieInfoType;
  isModalOpen: boolean;
  category: string;
  isCastOpen: boolean;
};

const initialState: InitialStateType = {
  isLoading: true,
  movieInfo: <MovieInfoType>{},
  isModalOpen: false,
  category: "cast",
  isCastOpen: false,
};

export const getMovie = createAsyncThunk(
  "singleMovie/getMovie",
  async (id: string, thunkAPI) => {
    try {
      const resp = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=credits,keywords&adult=false`
      );
      return resp.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const singleMovieSlice = createSlice({
  name: "singleMovie",
  initialState,
  reducers: {
    toggleModal: (state, { payload }) => {
      state.isModalOpen = payload;
      if (payload) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    toggleCategory: (state, { payload }) => {
      state.category = payload;
    },
    toggleCast: (state, { payload }) => {
      state.isCastOpen = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getMovie.fulfilled,
        (state, action: PayloadAction<MovieInfoType>) => {
          state.isLoading = false;
          state.movieInfo = action.payload;
        }
      )
      .addCase(getMovie.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { toggleModal, toggleCategory, toggleCast } =
  singleMovieSlice.actions;

export const { reducer } = singleMovieSlice;
