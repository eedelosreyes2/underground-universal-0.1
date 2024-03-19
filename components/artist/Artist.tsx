import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import ArtistProfile from "../ArtistProfile";

const Artist = ({ artist }: any) => {
  const router = useRouter();
  const { user } = useUser();
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
    createdAt,
    udpatedAt,
    dob,
    status,
    collabsSent,
    collabsReceived,
  } = artist[0];

  const isUserProfile = () => {
    return user?.email == email;
  };

  const isProfileComplete = () => {
    return username && name && location;
  };

  const renderPageHeader = () => {
    if (isUserProfile()) {
      return (
        <div className="flex justify-between w-full mb-5">
          <div
            onClick={() => router.push("/settings/profile")}
            className="flex items-center gap-2 text-button"
          >
            {isProfileComplete() ? "Edit profile" : "Complete profile"}
          </div>
        </div>
      );
    }
  };

  const renderMusicSharing = () => {
    return (
      <div className="mt-10">
        Music sharing is not yet available. Join our{" "}
        <a
          className="text-button"
          href="https://discord.com/invite/KNUG3yTsT8/"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>{" "}
        to get the latest updates.
      </div>
    );
  };

  console.log("imgSrc", imgSrc);

  return (
    <div className="pb-12">
      {renderPageHeader()}
      <ArtistProfile
        key={id}
        id={id}
        name={name}
        email={email}
        username={username}
        location={location}
        bio={bio}
        imgSrc={imgSrc}
        trackId={trackSig}
        badgeId={badge}
        roles={roles}
        genres={genres}
        experience={experience}
        streamings={streamings}
        createdAt={createdAt}
        udpatedAt={udpatedAt}
        dob={dob}
        status={status}
        collabsSent={collabsSent}
        collabsReceived={collabsReceived}
      />
      {/* {renderMusicSharing()} */}
    </div>
  );
};

export default Artist;
