import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { MoviesList } from '@/components/MoviesList';
import Search from '@/components/Search';
import CriteriaSearch from '@/components/CriteriaSearch';
import Navigation from '@/components/Navigation';
import styles from './page.module.css';

const DynamicModalWindow= dynamic<{}>(() => import('@/components/modalWindow/ModalWindow').then(module => module.default), {
  ssr: false,
  suspense: true
});

export default function Home() { 

  return (
    <>
      <header>
        <Search />
      </header>

      <div className="types">
        <Suspense>
          <Navigation />
        </Suspense>
        <CriteriaSearch />
      </div>

      <div className={styles.wrapper}>
        <Suspense>
          <MoviesList />
        </Suspense>
      </div>

      <DynamicModalWindow />
    </>
  );
}