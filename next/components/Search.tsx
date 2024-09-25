'use client'

import { useState, useEffect, createRef } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { SET_SHOW_ADD_MODAL } from '@/redux/features/ModalWindowSlice';
import useLocalStorageState from '@/components/shared/useLocalStorageState';
import styles from './Search.module.css';

type StateControlValue = {
  disabled: boolean,
  myRef: {
    value: string
  }
}

const Search = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sortBy = useSelector((state: RootState) => state.moviesReducer.sortBy);

  const [defaultValue, setDefaultValue] = useLocalStorageState(
    'my-app-defaultValueSearch',
    ''
  );

  const [controlValue, setControlValue] = useState({
    disabled: true,
    myRef: createRef()
  } as unknown as StateControlValue);

  const handleChange = () => {
    setControlValue({ disabled: !controlValue.myRef.value } as StateControlValue);
    setDefaultValue(controlValue.myRef.value);
  };

  const handleClick = () => {
    router.push(`/movies?search=${controlValue.myRef.value}&searchBy=title&sortBy=${sortBy}&sortOrder=desc`)
  };

  useEffect(() => {
    setControlValue({ disabled: !defaultValue } as StateControlValue);
  }, [defaultValue]);

  return (
    <>
      <Button
        className={styles.add}
        variant="outline-danger"
        onClick={() => dispatch(SET_SHOW_ADD_MODAL(true))}
      >
        + Add movie
      </Button>

      <h1>Find your movie</h1>

      <InputGroup className={styles.search}>
        <FormControl
          placeholder="Please write the film name"
          ref={(controlInput: HTMLInputElement) => (controlValue.myRef = controlInput)}
          onChange={handleChange}
          defaultValue={defaultValue}
        />
        <Button variant="outline-danger" onClick={handleClick} disabled={controlValue.disabled}>Search</Button>
      </InputGroup>
    </>
  );
}

export default Search;