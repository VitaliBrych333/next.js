'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './Navigation.module.css';

const Navigation = () => {
  const types = ['all', 'documentary', 'comedy', 'horror', 'crime'];
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  const sortBy = useSelector((state: RootState) => state.moviesReducer.sortBy);

  return (
    <ul className={styles.list}>
      {types.map((type, index) => (
        <li key={index} className={filter  === type || (!filter && type === types[0]) ? styles.active : ''}>
          {type === types[0]
            ? (<Link href="/">{type}</Link>)
            : (<Link href={`/movies?filter=${type}&searchBy=genres&sortBy=${sortBy}&sortOrder=desc`}>{type}</Link>)}
        </li>
      ))}
    </ul>
  );
}

export default Navigation;