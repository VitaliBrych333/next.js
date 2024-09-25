import { createAsyncThunk } from '@reduxjs/toolkit';
import { Movie } from '../types';

export const baseUrl = 'http://localhost:4000';

export const fetchMovies = createAsyncThunk(
  'getAllMovies',
  async (queryParams?: { search?: string | null, sortBy?: string | null, filter?: string | null }) => {
    try {
      const searchStr = queryParams?.search ? `search=${queryParams.search}&searchBy=title`: '';
      const sortStr = queryParams?.sortBy ? `sortBy=${queryParams.sortBy}&sortOrder=desc`: '';
      const filterStr = queryParams?.filter && queryParams?.filter !== 'all' ? `filter=${queryParams.filter}&searchBy=genres`: '';
      const url = `${baseUrl}/movies${searchStr ? `?${searchStr}`: filterStr ? `?${filterStr}`: ''}${sortStr && !searchStr && !filterStr ? `?${sortStr}`: sortStr ? `&${sortStr}`: ''}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Can not get movies!');
      } else {
        return response.json();
      }

    } catch (error) {
      return error;
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'getMovie',
  async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/movies/${id}`);

      if (!response.ok) {
        throw new Error(`Can not get movie with ${id}!`);
      } else {
        return response.json();
      }

    } catch (error) {
      return error;
    }
  }
);

export const addMovie = createAsyncThunk(
  'addMovie',
  async (movie: Movie) => {
    try {
      const response = await fetch(`${baseUrl}/movies`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(movie) });

      if (!response.ok) {
        throw new Error('Can not create new movie!');
      } else {
        return response.json();
      }

    } catch (error) {
      return error;
    }
  }
);

export const updateMovie = createAsyncThunk(
  'updateMovie',
  async (movie: Movie) => {
    try {
      const response = await fetch(`${baseUrl}/movies`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(movie) });

      
      if (!response.ok) {
        throw new Error(`Can not update movie with id ${movie.id}!`);
      } else {
        return response.json();
      }

    } catch (error) {
      return error;
    }
  }
);

export const deleteMovie = createAsyncThunk(
  'deleteMovie',
  async (id: number) => {
    try {
      const response = await fetch(`${baseUrl}/movies/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(`Can not delete movie with id ${id}!`);
      } else {
        return id;
      }

    } catch (error) {
      return error;
    }
  }
);