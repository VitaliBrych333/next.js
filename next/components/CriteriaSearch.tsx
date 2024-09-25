'use client'

import { SyntheticEvent } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem }  from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks';
import { SET_SORT_TYPE } from '@/redux/features/MoviesSlice';
import styles from './CriteriaSearch.module.css';

const CriteriaSearch = () => {
  const dispatch = useAppDispatch();
  const sortBy = useSelector((state: RootState) => state.moviesReducer.sortBy);

  const onSelect = ((eventKey: string | null, e: SyntheticEvent<unknown>) =>
    dispatch(SET_SORT_TYPE((e.target as HTMLElement).textContent === 'Release date' ? 'release_date' : 'vote_average'))
  );

  return (
    <div className={styles.sort}>
      <p>Sort by</p>
      <Dropdown onSelect={onSelect}>
        <DropdownToggle variant="secondary" id="dropdown-basic">{sortBy === 'release_date' ? 'Release date' : 'Rating'}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>Release date</DropdownItem>
          <DropdownItem>Rating</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CriteriaSearch;