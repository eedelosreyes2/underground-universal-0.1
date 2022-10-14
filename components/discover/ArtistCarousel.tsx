import SearchBar from '../SearchBar';
import Control from './Control';
import ArtistProfile from '../ArtistProfile';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_ARTISTS = gql`
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

const ArtistCarousel = () => {
  const { data, loading, error } = useQuery(GET_ALL_ARTISTS);
  const artists = data?.artists?.filter(
    (artist: any) => artist.name && artist.username && artist.location
  );

  const collabHandler = () => {
    console.log('Collab with <Artist.name>');
  };

  const leftHandler = () => {
    console.log('Left');
  };

  const rightHandler = () => {
    console.log('Right');
  };

  return (
    <div className="flex flex-col items-center overflow-scroll no-scrollbar">
      <div className="md:h-[1000px] md:block">
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
      </div>

      <div className="h-[50px] md:h-[600px] md:block"></div>

      {/* <Control
        ctaHandler={collabHandler}
        leftHandler={leftHandler}
        rightHandler={rightHandler}
        label="Collab with Zaction"
      /> */}
    </div>
  );
};

export default ArtistCarousel;
