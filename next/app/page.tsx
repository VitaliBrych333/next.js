import dynamic from 'next/dynamic';
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
        <Navigation />
        <CriteriaSearch />
      </div>

      <div className={styles.wrapper}>
        <MoviesList />
      </div>

      <DynamicModalWindow />
    </>
  );
}
