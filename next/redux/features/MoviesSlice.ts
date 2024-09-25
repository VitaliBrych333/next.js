'use client'

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieById, addMovie, updateMovie, deleteMovie } from './api';
import { Movie, ResponseMovies } from '../types';

type StateProp = {
  movies: Array<Movie>,
  countMovies: number,
  editMovie: Movie,
  idActiveMenu: number | null;
  sortBy: string,
  loading: boolean,
  loadingMovie: boolean
};

const initialState: StateProp = {
  movies: [],
  countMovies: 0,
  editMovie: {} as Movie,
  idActiveMenu: null,
  sortBy: 'release_date',
  loading: false,
  loadingMovie: false
};

const sortBy = (value: string, data: Array<Movie>) => {
  let sortData = [] as Array<Movie>;

  switch (value) {
    case 'vote_average':
      sortData = data.sort((a, b) => b.vote_average - a.vote_average);
      break;
    case 'release_date':
      sortData = data.sort((a, b) => +new Date(b.release_date) - +new Date(a.release_date));
      break;
    default:
      break;
  }

  return sortData;
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: { 
    SET_MOVIES: (state, action) => {
      state.movies = action.payload;
    },
    SET_EDIT_MOVIE: (state, action) => {
      state.editMovie = action.payload;
    },
    SET_ID_ACTIVE_MENU: (state, action) => {
      state.idActiveMenu = action.payload;
    },
    SET_SORT_TYPE: (state, action) => {
      state.sortBy = action.payload;

      if (state.movies.length) {
        state.movies = sortBy(state.sortBy, state.movies.slice());
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<ResponseMovies>) => {
          state.movies = action.payload.data;
          state.countMovies = action.payload.totalAmount;
          state.loading = false;
        }
      )
      .addCase(fetchMovieById.pending, (state, action) => {
        state.loadingMovie = true;
      })
      .addCase(
        fetchMovieById.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.editMovie = action.payload;
          state.loadingMovie = false;
        }
      )
      .addCase(addMovie.pending, (state, action) => {
        state.loadingMovie = true;
      })
      .addCase(
        addMovie.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.movies = [...state.movies, action.payload];
          state.countMovies = state.countMovies + 1;
          state.loadingMovie = false;
        }
      )
      .addCase(updateMovie.pending, (state, action) => {
        state.loadingMovie = true;
      })
      .addCase(
        updateMovie.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          const index = state.movies.findIndex(movie => movie.id === action.payload.id);
          state.movies = [...state.movies.slice(0, index), action.payload, ...state.movies.slice(index + 1)];
          state.editMovie = {} as Movie;
          state.loadingMovie = false;
        }
      )
      .addCase(deleteMovie.pending, (state, action) => {
        state.loadingMovie = true;
      })
      .addCase(
        deleteMovie.fulfilled,
        (state, action) => {
          state.movies = state.movies.filter((movie) => movie.id !== action.payload);
          state.countMovies = state.countMovies - 1;
          state.editMovie = {} as Movie;
          state.loadingMovie = false;
        }
      );
    }
});

export default moviesSlice.reducer;
export const { SET_MOVIES, SET_EDIT_MOVIE, SET_ID_ACTIVE_MENU, SET_SORT_TYPE } = moviesSlice.actions;