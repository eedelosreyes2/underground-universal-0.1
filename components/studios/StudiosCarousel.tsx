import { gql, useQuery } from '@apollo/client';
import Studio from './Studio';

const StudiosQuery = gql`
  query {
    studios {
      id
      url
      email
      name
      location
      bio
      hours
      rates
      hasEngineer
      hasMixing
      hasVideo
      albums
      tracks
      artists
    }
  }
`;

const StudiosCarousel = () => {
  const { data, loading, error } = useQuery(StudiosQuery);
  const studios = data?.studios;

  return (
    <div className="flex flex-col items-center overflow-scroll no-scrollbar">
      {loading && <p>Loading</p>}
      {error && <p>Oh no... {error.message}</p>}

      {studios?.map(
        (studio: {
          id: any;
          url: any;
          email: any;
          name: any;
          location: any;
          bio: any;
          hours: any;
          rates: any;
          hasEngineer: any;
          hasMixing: any;
          hasVideo: any;
          albums: any;
          tracks: any;
          artists: any;
        }) => {
          console.log(studio);
          return <Studio />;
        }
      )}

      {/* Extra space at bottom */}
      <div className="h-[250px] md:h-[600px] md:block"></div>
    </div>
  );
};

export default StudiosCarousel;
