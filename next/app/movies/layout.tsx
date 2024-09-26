'use client'

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { MoviesList } from '@/components/MoviesList';
import CriteriaSearch from '@/components/CriteriaSearch';
import Navigation from '@/components/Navigation';
import styles from './movies.module.css';

const DynamicModalWindow = dynamic<{}>(() => import('@/components/modalWindow/ModalWindow').then(module => module.default), {
  ssr: false,
  suspense: true
});

export default function MoviesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams<{ id: string }>();

  return (
    <>   
      {children}

      <div className="types">
        <Suspense>
          <Navigation />
        </Suspense>
        <CriteriaSearch />
      </div>

      <div className={id ? styles.wrapper: styles.wrapper_details}>
        <Suspense>
          <MoviesList />
        </Suspense>
      </div>

      <DynamicModalWindow />
    </>
  );
}