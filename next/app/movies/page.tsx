import Search from '@/components/Search';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <header>
      <Search />
    </header>
  );
}