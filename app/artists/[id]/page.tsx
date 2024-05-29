interface ArtistPageProps {
  params: {
    id: string;
  };
}
const ArtistPage = ({ params }: ArtistPageProps) => {
  return (
    <div>
      <h1>
        Artist
        {params.id}
      </h1>
    </div>
  );
};
export default ArtistPage;
