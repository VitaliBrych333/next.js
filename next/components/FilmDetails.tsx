'use client'

import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { Search } from 'react-bootstrap-icons';
import { baseUrl } from '@/redux/features/api';
import { Loading } from '@/components/shared/Loading';
import styles from './FilmDetails.module.css';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const FilmDetails = (props: { id: string }) => {
  const { id } = props;
  const { data, error } = useSWR(`${baseUrl}/movies/${id}`, fetcher);
    
  if (error) return <div>Failed to load</div>;

  if (!data) return <Loading customClass="loader_head" />;

  return (
    <>
      <div className={styles.description}>
        <Link className={styles.search} href="/"><Search color="#f65261" size="22px" /></Link>

        <Image src={data.poster_path} width="150" height="220" alt="Film" />
        <div>
          <h3>{data.title} <span className={styles.tagline}>{data.tagline}</span> <span className={styles.raiting}>{data.vote_average}</span></h3>
          <p><span>{data.release_date.slice(0, 4)}</span> year</p>

          {data.runtime && (
            <p><span>{data.runtime}</span> min</p>
          )}
          <p className={styles.overview}>{data.overview}</p>
        </div>
      </div>
    </>
  );
}

export { FilmDetails };