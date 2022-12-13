import { gql, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';

const GET_COLLABS = gql`
  query ($email: String!) {
    getArtistByEmail(email: $email) {
      collabsSent
      collabsReceived
    }
  }
`;

const GET_ARTISTS_BY_EMAIL = gql`
  query GetArtistsByEmail($emails: [String!]!) {
    getArtistsByEmail(emails: $emails) {
      name
      email
    }
  }
`;

const Collabs = () => {
  const { user } = useUser();
  const { data: collabsSentData } = useQuery(GET_COLLABS, {
    variables: { email: user?.email },
  });

  // Fetch collabs data by email
  const { data: collabsSentArtistData } = useQuery(GET_ARTISTS_BY_EMAIL, {
    variables: { emails: collabsSentData?.getArtistByEmail.collabsSent },
  });
  const { data: collabsReceievedArtistData } = useQuery(GET_ARTISTS_BY_EMAIL, {
    variables: { emails: collabsSentData?.getArtistByEmail.collabsReceived },
  });

  // Collab artist data
  const collabsSent = collabsSentArtistData?.getArtistsByEmail;
  const collabsReceived = collabsReceievedArtistData?.getArtistsByEmail;

  console.log('Sent', collabsSent);
  console.log('Receieved', collabsReceived);

  return <div>Collabs</div>;
};

export default Collabs;
