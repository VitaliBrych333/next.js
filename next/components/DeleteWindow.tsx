'use client'

import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { deleteMovie } from '@/redux/features/api';
import { SET_SHOW_DELETE_MODAL } from '@/redux/features/ModalWindowSlice';
import NameWindow from '@/components/NameWindow';
import styles from './DeleteWindow.module.css';

const DeleteWindow = () => {
  const dispatch = useAppDispatch();
  const editMovie = useSelector((state: RootState) => state.moviesReducer.editMovie);
  
  const handleClick = useCallback(() => {
    dispatch(deleteMovie(editMovie.id));
    dispatch(SET_SHOW_DELETE_MODAL(false));
  }, [dispatch, editMovie.id]);
  
  return (
    <div className={styles.wrapper_delete}>
      <section className={styles.window_delete}>
      <NameWindow namePage="Delete Movie" handleClose={() => dispatch(SET_SHOW_DELETE_MODAL(false))} />
      <p>Are you sure you want to delete this movie?</p>
      <Button className={styles.btn} onClick={handleClick} >
        Confirm
      </Button>
      </section>
    </div>
  );
}

export default DeleteWindow;