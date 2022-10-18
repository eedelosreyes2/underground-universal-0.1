import { Studio } from '@prisma/client';

const StudioCard = ({
  id,
  createdAt,
  udpatedAt,
  url,
  email,
  name,
  location,
  badgeId,
  bio,
  hours,
  rates,
  hasEngineer,
  hasMixing,
  hasVideo,
}: // albums,
// tracks,
// artists,
Studio) => {
  console.log(
    id,
    createdAt,
    udpatedAt,
    url,
    email,
    name,
    location,
    badgeId,
    bio,
    hours,
    rates,
    hasEngineer,
    hasMixing,
    hasVideo
    // albums,
    // tracks,
    // artists
  );
  return <div className="card"></div>;
};

export default StudioCard;
