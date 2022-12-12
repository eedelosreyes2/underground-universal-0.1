import { gql, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';

const GET_ARTIST = gql`
  query ($email: String!) {
    getArtistByEmail(email: $email) {
      id
      name
      email
      username
      location
      bio
      imgSrc
      roles
      genres
      experience
      streamings
      collabsSent
      collabsReceived
    }
  }
`;

const Collabs = () => {
  const { user } = useUser();
  const { data } = useQuery(GET_ARTIST, { variables: { email: user?.email } });

  console.log(data);

  return <div>Collabs</div>;
};

export default Collabs;
