import { gql, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
      username
    }
  }
`;

const Collabs = () => {
  const router = useRouter();
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

  // TODO: Filter Collabed, Sent, and Receieved

  // Collab artist data
  const collabsSent = collabsSentArtistData?.getArtistsByEmail;
  const collabsReceived = collabsReceievedArtistData?.getArtistsByEmail;

  return (
    <div className="flex flex-col w-full">
      <h3 className="mb-3">Sent</h3>
      <div className="flex flex-col gap-3">
        {collabsSent &&
          Object.values(collabsSent).map((artist: any) => (
            <div
              onClick={() => router.push('/' + artist.username)}
              className="flex items-center justify-between rounded-3xl
              p-5 cursor-pointer bg-component-light dark:bg-component-dark"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={'/default_artist_img.jpg'}
                  width={32}
                  height={32}
                  alt="Profile"
                  className="rounded-full"
                />
                {artist.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Collabs;
