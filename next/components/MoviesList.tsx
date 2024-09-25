'use client'

import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { fetchMovies } from '@/redux/features/api';
import { Movie } from '@/redux/types';
import { CardFilm } from '@/components/CardFilm';
import { Loading } from '@/components/shared/Loading';
import styles from './MoviesList.module.css';

export const MoviesList = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const filter = searchParams.get('filter');

  const dispatch = useAppDispatch();
  const movies = useSelector((state: RootState) => state.moviesReducer.movies);
  const countMovies = useSelector((state: RootState) => state.moviesReducer.countMovies);
  const loading = useSelector((state: RootState) => state.moviesReducer.loading);
  const sortBy = useSelector((state: RootState) => state.moviesReducer.sortBy);

  useEffect(() => {
    if (!id || (id && !movies.length)) {
      dispatch(fetchMovies({ search, sortBy, filter }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search, sortBy, filter]);

  if (loading) {
    return <Loading customClass="loader_main" />;
  } else {
    return (
      <>
        { countMovies > 0 && (<div className={styles.count}><p className="count">{countMovies} {countMovies > 1 ? 'Movies': 'Movie'} found</p></div>) }

        <div className={styles.wrapper}>
          {movies.map((item: Movie) => (
            <CardFilm key={item.id} info={item} />
          ))}
        </div>
      </>
    );
  }
}