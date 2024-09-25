'use client'

import React, { useEffect, useCallback, useId } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import Select, { GroupBase } from 'react-select';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { addMovie, updateMovie } from '@/redux/features/api';
import { Movie } from '@/redux/types';
import { SET_SHOW_ADD_MODAL, SET_SHOW_EDIT_MODAL } from '@/redux/features/ModalWindowSlice';
import NameWindow from '@/components/NameWindow';
import styles from './FormInfo.module.css';

interface GenreOption {
  readonly value: string;
  readonly label: string;
}

const genreOptions: Array<GenreOption> = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'action', label: 'Action' },
  { value: 'animation', label: 'Animation' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'crime', label: 'Crime' },
  { value: 'drama', label: 'Drama' },
  { value: 'horror', label: 'Horror' },
  { value: 'history', label: 'History' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'family', label: 'Family' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'music', label: 'Music' },
  { value: 'romance', label: 'Romance' },
  { value: 'science fiction', label: 'Science Fiction' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'war', label: 'War' }
];

const FormSchema = Yup.object({
  id: Yup.number().integer('Invalid format'),
  title: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
  url: Yup.string().url('Invalid format').required('Required'),
  genre: Yup.array().of(Yup.object().shape({
                                              value: Yup.string(),
                                              label: Yup.string()
                                            })
                        ).nullable().required('Required').min(1),
  overview: Yup.string().required('Required'),
  runtime: Yup.number()
    .integer('Invalid format')
    .positive('Invalid format')
    .required('Required')
});

const initialValues = {
  id: '',
  title: '',
  date: '',
  url: '',
  genre: [],
  overview: '',
  runtime: ''
};

const FormInfo = (props: { namePage: string, nameButton: string }) => {
  const { namePage, nameButton } = props;
  const dispatch = useAppDispatch();
  const filmEdit = useSelector((state: RootState) => state.moviesReducer.editMovie);

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,

    onSubmit: (value) => {
      const newFilm = {
        title: value.title,
        genres: Array.from(value.genre, (item: GenreOption) => item.label),
        release_date: value.date,
        poster_path: value.url,
        overview: value.overview,
        runtime: +value.runtime,
        vote_average: 0
      } as unknown as Movie;
        
      if (nameButton === 'Submit') {
        dispatch(addMovie(newFilm));
      } else if (nameButton === 'Save') {
        newFilm.id = +value.id;
        newFilm.vote_average = filmEdit.vote_average;
        dispatch(updateMovie(newFilm));
      }

      handleClose();
    }
  });

  const handleReset = useCallback(() => {
    formik.resetForm();
  
    if (namePage === 'Edit movie') {
      formik.setFieldValue('id', filmEdit.id);
    }
  }, [formik, namePage, filmEdit]);

  const handleClose = useCallback(() => {
    switch (namePage) {
      case 'Edit movie':
        dispatch(SET_SHOW_EDIT_MODAL(false));
        break;
      case 'Add movie':
        dispatch(SET_SHOW_ADD_MODAL(false));
        break;
      default:
        break;
    }
  }, [dispatch, namePage]);

  useEffect(() => {
    if (namePage === 'Edit movie' && filmEdit && !formik.values.id) {
      formik.setValues({
        id: filmEdit.id?.toString() || '',
        title: filmEdit.title || '',
        date: filmEdit.release_date || '',
        url: filmEdit.poster_path || '',
        genre: filmEdit.genres?.flatMap(
          (item: string) => new Object({ value: item.toLowerCase(), label: item })
        ) as never[] || '',
        overview: filmEdit.overview || '',
        runtime: filmEdit.runtime?.toString() || ''
      });
    }
  }, [filmEdit, namePage, formik]);

  return (
    <Form className={styles.form}>
      <NameWindow namePage={namePage} handleClose={handleClose} />

      <Form.Group>
        {namePage === 'Edit movie' && (
          <>
            <Form.Label>Movie id</Form.Label>
              <Form.Control
                type="number"
                value={formik.values.id}
                name="id"
                onChange={formik.handleChange}
                placeholder="Id"
                readOnly />
          </>
        )}

        <Form.Label>Title</Form.Label>
        <Form.Control
          type="title"
          placeholder="Title"
          value={formik.values.title}
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title
          ? (<div className={styles.error}>{formik.errors.title}</div>)
          : null}

        <Form.Label>Release date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Select Date"
          value={formik.values.date}
          name="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.date && formik.errors.date
          ? (<div className={styles.error}>{formik.errors.date}</div>)
          : null}

        <Form.Label>Movie URL</Form.Label>
        <Form.Control
          type="url"
          placeholder="Movie URL here"
          value={formik.values.url}
          name="url"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.url && formik.errors.url
          ? (<div className={styles.error}>{formik.errors.url}</div>)
          : null}

        <Form.Label>Example select</Form.Label>
        <Select
          instanceId={useId()}
          placeholder="Select Genre"
          value={formik.values.genre}
          isMulti
          onChange={(newValue) => formik.setFieldValue('genre', newValue)}
          onMenuClose={() => formik.setTouched({ genre: true as unknown as never[] })}
          options={genreOptions as unknown as GroupBase<never>[]}
        />
        {formik.touched.genre && formik.errors.genre
          ? (<div className={styles.error}>{formik.errors.genre}</div>)
          : null}

        <Form.Label>Overview</Form.Label>
        <Form.Control
          type="text"
          placeholder="Overview here"
          value={formik.values.overview}
          name="overview"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.overview && formik.errors.overview
          ? (<div className={styles.error}>{formik.errors.overview}</div>)
          : null}

        <Form.Label>Runtime</Form.Label>
        <Form.Control
          type="number"
          placeholder="Runtime here"
          value={formik.values.runtime}
          name="runtime"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.runtime && formik.errors.runtime
          ? (<div className={styles.error}>{formik.errors.runtime}</div>)
          : null}
      </Form.Group>

      <div className={styles.actions}>
        <Button className={styles.btn} onClick={handleReset}>Reset</Button>
        <Button className={styles.btn} onClick={formik.submitForm} disabled={!(formik.dirty && formik.isValid)}>
          {nameButton}
        </Button>
      </div>
    </Form>
  );
}

export { FormInfo };