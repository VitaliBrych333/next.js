import { FilmDetails } from '@/components/FilmDetails';

export default function Page({ params }: { params: { id: string } }) {

  return <FilmDetails id={params.id} />;
}