import ArtistProfile from '../ArtistProfile';
import { Artist } from '@prisma/client';
import { useUser } from '@auth0/nextjs-auth0';

const DiscoverCarousel = ({ artists }: any) => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center overflow-scroll no-scrollbar w-full">
      {!artists && <p>Loading</p>}

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
              collabsSent={artist.collabsSent}
              collabsReceived={artist.collabsReceived}
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
