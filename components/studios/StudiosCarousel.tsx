import { gql, useQuery } from '@apollo/client';
import { Studio } from '@prisma/client';
import StudioCard from './StudioCard';

const StudiosQuery = gql`
  query {
    studios {
      id
      createdAt
      updatedAt
      url
      email
      name
      location
      badgeId
      bio
      hours
      rates
      hasEngineer
      hasMixing
      hasVideo
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

      {studios?.map((studio: Studio) => {
        console.log(studio);
        return (
          <StudioCard
            key={studio.id}
            id={studio.id}
            createdAt={studio.createdAt}
            udpatedAt={studio.udpatedAt}
            url={studio.url}
            email={studio.email}
            name={studio.name}
            location={studio.location}
            badgeId={studio.badgeId}
            bio={studio.bio}
            hours={studio.hours}
            rates={studio.rates}
            hasEngineer={studio.hasEngineer}
            hasMixing={studio.hasMixing}
            hasVideo={studio.hasVideo}
          />
        );
      })}

      {/* Extra space at bottom */}
      <div className="h-[250px] md:h-[600px] md:block"></div>
    </div>
  );
};

export default StudiosCarousel;
