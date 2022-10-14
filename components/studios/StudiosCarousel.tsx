import { gql, useQuery } from '@apollo/client';

const StudiosQuery = gql`
  query {
    studios {
      id
      email
    }
  }
`;

const StudiosCarousel = () => {
  // const artists = data?.artists?.filter(
  //   (artist: any) => artist.name && artist.username && artist.location
  // );
  const { data, loading, error } = useQuery(StudiosQuery);
  console.log(data);

  return (
    <div className="flex flex-col items-center overflow-scroll no-scrollbar">
      {loading && <p>Loading</p>}
      {error && <p>Oh no... {error.message}</p>}

      {/* {artists?.map(
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
      )} */}

      {/* Extra space at bottom */}
      <div className="h-[250px] md:h-[600px] md:block"></div>
    </div>
  );
};

export default StudiosCarousel;

// import { useQuery } from '@apollo/client';
// import { getSession } from '@auth0/nextjs-auth0';
// import { gql } from 'apollo-server-micro';
// import Carousel from '../discover/StudioCarousel';
// import SearchBar from '../SearchBar';

// export const getServerSideProps = async ({
//   req,
//   res,
// }: {
//   req: any;
//   res: any;
// }) => {
//   const session = getSession(req, res);

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/api/auth/login',
//       },
//       props: {},
//     };
//   }

//   return {
//     props: {},
//   };
// };

// const AllStudiosQuery = gql`
//   query {
//     studios {
//       id
//       email
//     }
//   }
// `;

// const StudiosCarousel = () => {
//   const { data, loading, error } = useQuery(AllStudiosQuery);

//   console.log(data);

//   return (
//     <div>
//       <SearchBar label="Name or location" />
//       {loading ? <p>Loading</p> : <Carousel />}
//     </div>
//   );
// };

// export default StudiosCarousel;
