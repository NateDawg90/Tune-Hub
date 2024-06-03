import AlbumComponent from '@/app/(components)/album';
interface AlbumPageProps {
  id: string;
}
export default function Page({ params }: { params: { id: string } }) {
  return <AlbumComponent id={params.id} />;
}
