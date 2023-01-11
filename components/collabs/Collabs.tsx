import { gql, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons';
import { HiOutlineAtSymbol } from 'react-icons/hi';
import {
  IoChatboxEllipses,
  IoCheckmarkOutline,
  IoCloseOutline,
} from 'react-icons/io5';

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

  // Collab artist data
  const collabsSent = Object.values(
    collabsSentArtistData?.getArtistsByEmail || {}
  );
  const collabsReceived = Object.values(
    collabsReceievedArtistData?.getArtistsByEmail || {}
  );

  // Filter and set objects to render
  const collabs = collabsSent.filter((sentCollab: any) =>
    collabsReceived
      .map((receivedCollab: any) => receivedCollab.username)
      .includes(sentCollab.username)
  );
  const sent = collabsSent.filter(
    (collabSent: any) =>
      !collabs
        .map((collab: any) => collab.username)
        .includes(collabSent.username)
  );
  const received = collabsReceived.filter(
    (collabReceived: any) =>
      !collabs
        .map((collab: any) => collab.username)
        .includes(collabReceived.username)
  );

  const handleRemoveSent = (artist: any) => {
    if (confirm('Cancel Collab request to ' + artist.name + '?')) {
      // TODO
      console.log('remove ' + artist.name + ' from collabsSent');
    }
  };

  const handleAcceptReceieved = (artist: any) => {
    if (confirm('Accept Collab request from ' + artist.name + '?')) {
      // TODO
      console.log(
        'add ' + artist.name + ' to collabsSent as well as collabsReceived'
      );
    }
  };

  const handleRejectReceieved = (artist: any) => {
    if (confirm('Reject Collab request from ' + artist.name + '?')) {
      // TODO
      console.log('remove ' + artist.name + ' from collabsReceived');
    }
  };

  const handleSendMessage = (artist: any) => {
    // TODO
    alert(
      'The Messaging Collabs feature is not yet available... For now you can reach out to ' +
        artist.name +
        ' through their Discord/Email \n\nJoin the Underground Universal Discord to get updates on when this feature will be ready!'
    );
  };

  const renderCollab = (artist: any, type: string) => {
    return (
      <div
        key={artist.username}
        className="flex items-center justify-between rounded-xl
    md:p-5 p-3 bg-component-light dark:bg-component-dark"
      >
        <div
          onClick={() => router.push('/' + artist.username)}
          className="flex items-center gap-3 w-full max-w-sm cursor-pointer"
        >
          <Image
            src={'/default_artist_img.jpg'}
            width={48}
            height={48}
            alt="Profile"
            className="rounded-full"
          />
          <div>
            {artist.name}
            <h3 className="flex items-center font-medium">
              <HiOutlineAtSymbol />
              {artist.username}
            </h3>
          </div>
        </div>

        <div>
          {type === 'sent' && (
            <IconContext.Provider value={{ size: '1.2em' }}>
              <IoCloseOutline
                onClick={() => handleRemoveSent(artist)}
                className="cursor-pointer"
              />
            </IconContext.Provider>
          )}

          {type === 'receieved' && (
            <IconContext.Provider value={{ size: '1.2em' }}>
              <div className="flex gap-5">
                <IoCheckmarkOutline
                  onClick={() => handleAcceptReceieved(artist)}
                  className="cursor-pointer text-red"
                />
                <IoCloseOutline
                  onClick={() => handleRejectReceieved(artist)}
                  className="cursor-pointer"
                />
              </div>
            </IconContext.Provider>
          )}

          {type === 'collabed' && (
            <IconContext.Provider value={{ size: '1.5em', color: 'red' }}>
              <IoChatboxEllipses
                onClick={() => handleSendMessage(artist)}
                className="cursor-pointer"
              />
            </IconContext.Provider>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="mb-3">Sent</h3>
      <div className="flex flex-col gap-3 mb-10">
        {sent && sent.map((artist: any) => renderCollab(artist, 'sent'))}
      </div>

      <h3 className="mb-3">Received</h3>
      <div className="flex flex-col gap-3 mb-10">
        {received &&
          received.map((artist: any) => renderCollab(artist, 'receieved'))}
      </div>

      <h3 className="mb-3">Collabed</h3>
      <div className="flex flex-col gap-3 mb-10">
        {collabs &&
          collabs.map((artist: any) => renderCollab(artist, 'collabed'))}
      </div>
    </div>
  );
};

export default Collabs;
