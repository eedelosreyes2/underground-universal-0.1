import ArtistProfile from '../ArtistProfile';
import { gql, useQuery } from '@apollo/client';
import { Artist } from '@prisma/client';
import { useUser } from '@auth0/nextjs-auth0';

const GET_ARTIST_BY_EMAIL = gql`
  query {
    artists {
      id
      name
      email
      username
      location
      bio
      imgSrc
      trackId
      badgeId
      roles
      genres
      experience
      streamings
      createdAt
      udpatedAt
      dob
      status
    }
  }
`;

const DiscoverCarousel = () => {
  const { user } = useUser();
  const { data, loading, error } = useQuery(GET_ARTIST_BY_EMAIL);
  const artists = data?.artists?.filter(
    (artist: any) => artist.name && artist.username && artist.location
  );

  return (
    <div className="flex flex-col items-center overflow-scroll no-scrollbar">
      {loading && <p>Loading</p>}
      {error && <p>Oh no... {error.message}</p>}

      {artists?.map((artist: Artist) => {
        if (user?.email !== artist.email) {
          return (
            <ArtistProfile
              key={artist.id}
              id={artist.id}
              name={artist.name}
              email={artist.email}
              username={artist.username}
              location={artist.location}
              bio={artist.bio}
              imgSrc={artist.imgSrc}
              trackId={artist.trackId}
              badgeId={artist.badgeId}
              roles={artist.roles}
              genres={artist.genres}
              experience={artist.experience}
              streamings={artist.streamings}
              createdAt={artist.createdAt}
              udpatedAt={artist.udpatedAt}
              dob={artist.dob}
              status={artist.status}
            />
          );
        }
      })}

      {/* Extra space at bottom */}
      <div className="h-[250px] md:h-[600px] md:block"></div>
    </div>
  );
};

export default DiscoverCarousel;
