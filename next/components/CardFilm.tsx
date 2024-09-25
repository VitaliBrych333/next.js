'use client'

import { useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { v4 } from 'uuid';
import { Badge, Card } from 'react-bootstrap';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { Movie } from '@/redux/types';
import { fetchMovieById } from '@/redux/features/api';
import { SET_EDIT_MOVIE, SET_ID_ACTIVE_MENU } from '@/redux/features/MoviesSlice';
import { SET_SHOW_EDIT_MODAL, SET_SHOW_DELETE_MODAL } from '@/redux/features/ModalWindowSlice';
import styles from './CardFilm.module.css';

const DynamicMenu = dynamic(() => import('@/components/Menu').then(module => module.default), {
  ssr: false,
  suspense: true
});

const CardFilm = (props: { info: Movie }) => {
  const { info } = props;
  const [ dotsIsVisible, setDotsIsVisible ] = useState(false);

  const dispatch = useAppDispatch();
  const idActiveMenu = useSelector((state: RootState) => state.moviesReducer.idActiveMenu);
  
  const showModal = useCallback(() => {
    setDotsIsVisible(false);
    dispatch(SET_ID_ACTIVE_MENU(info.id));
  }, [dispatch, info.id]);

  const handleClickTag = useCallback(async (e: any) => {
    setDotsIsVisible(false);
    dispatch(SET_ID_ACTIVE_MENU(null));

    switch (e.target.innerHTML) {
      case 'Edit':
        await dispatch(fetchMovieById(info.id));
        dispatch(SET_SHOW_EDIT_MODAL(true));
        break;
      case 'Delete':
        dispatch(SET_EDIT_MOVIE(info));
        dispatch(SET_SHOW_DELETE_MODAL(true));
        break;
      default:
        break;
    }
  }, [dispatch, info]);

  return (
    <div className={styles.card}>
      <MoreVertIcon
        data-testid="custom-element"
        onMouseEnter={() => setDotsIsVisible(true)}
        onClick={showModal}
      />

      {dotsIsVisible && (
        <MoreVertIcon
          data-testid="custom-element"
          onMouseEnter={() => setDotsIsVisible(true)}
          onClick={showModal}
        />
      )}

      {idActiveMenu && info.id === idActiveMenu &&(
        <DynamicMenu handleClose={() => dispatch(SET_ID_ACTIVE_MENU(null))} >
          <p onClick={handleClickTag} onKeyDown={handleClickTag}>
            Edit
          </p>
          <p onClick={handleClickTag} onKeyDown={handleClickTag}>
            Delete
          </p>
        </DynamicMenu>
      )}

      <Card.Img
        variant="top"
        src={info.poster_path}
        onMouseEnter={() => setDotsIsVisible(true)}
        onMouseLeave={() => setDotsIsVisible(false)}
      />

      <Card.Body className={styles.details}>
        <div className={styles.title}>
          <Link href={`/movies/${info.id}`}>{info.title}</Link>

          <Badge bg="secondary">
            {info.release_date?.trim().slice(0, 4)}
          </Badge>
        </div>

        <div className={styles.types}>
          {info.genres?.map((type: string) => (
            <Link key={v4()} href={`/movies?filter=${type.toLowerCase()}&searchBy=genres`}>{type}</Link>
          ))}          
        </div>
      </Card.Body>
    </div>
  );
}

export { CardFilm };