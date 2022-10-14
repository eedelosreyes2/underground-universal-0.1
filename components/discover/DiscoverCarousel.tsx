import ArtistProfile from '../ArtistProfile';
import { gql, useQuery } from '@apollo/client';

const ArtistsQuery = gql`
  query {
    artists {
      id
      email
      name
      username
      location
      bio
      roles
      genres
      experience
      streamings
    }
  }
`;

const DiscoverCarousel = () => {
  const { data, loading, error } = useQuery(ArtistsQuery);
  const artists = data?.artists?.filter(
    (artist: any) => artist.name && artist.username && artist.location
  );

  return (
    <div className="flex flex-col items-center overflow-scroll no-scrollbar">
      {loading && <p>Loading</p>}
      {error && <p>Oh no... {error.message}</p>}

      {artists?.map(
        (artist: {
          id: any;
          name: any;
          email: any;
          username: any;
          location: any;
          bio: any;
          imgSrc: any;
          trackSig: any;
          badge: any;
          roles: any;
          genres: any;
          experience: any;
          streamings: any;
        }) => {
          const {
            id,
            name,
            email,
            username,
            location,
            bio,
            imgSrc,
            trackSig,
            badge,
            roles,
            genres,
            experience,
            streamings,
          } = artist;

          // if (user?.email !== email) {
          return (
            <ArtistProfile
              key={id}
              id={id}
              name={name}
              email={email}
              username={username}
              location={location}
              bio={bio}
              imgSrc={imgSrc}
              trackSig={trackSig}
              badge={badge}
              roles={roles}
              genres={genres}
              experience={experience}
              streamings={streamings}
            />
          );
          // }
        }
      )}

      {/* Extra space at bottom */}
      <div className="h-[250px] md:h-[600px] md:block"></div>
    </div>
  );
};

export default DiscoverCarousel;
