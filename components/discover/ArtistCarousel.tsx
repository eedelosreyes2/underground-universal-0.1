import Control from './Control';
import ArtistProfile from '../artistProfile';

const Carousel = ({ artists }: any) => {
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
    <div className="w-full flex flex-col items-center">
      <div className="">
        {artists.map(
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
          }
        )}
      </div>

      <Control
        ctaHandler={collabHandler}
        leftHandler={leftHandler}
        rightHandler={rightHandler}
        label="Collab with Zaction"
      />
    </div>
  );
};

export default Carousel;
