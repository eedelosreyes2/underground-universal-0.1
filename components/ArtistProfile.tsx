import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { HiOutlineAtSymbol } from 'react-icons/hi';
import { MdVerified } from 'react-icons/md';
import { TbCurrentLocation } from 'react-icons/tb';
import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiYoutube,
  SiBandcamp,
} from 'react-icons/si';
import Genre from '../components/tags/Genre';
import Experience from '../components/tags/Experience';
import Role from '../components/tags/Role';
import Image from 'next/image';
import { Artist } from '@prisma/client';
import { gql, useMutation, useQuery } from '@apollo/client';
import { BsCheckLg } from 'react-icons/bs';
import Modal from './Modal';

const GET_COLLABS = gql`
  query ($email: String!) {
    getArtistByEmail(email: $email) {
      id
      collabsSent
      collabsReceived
    }
  }
`;

const GET_ARTISTS_BY_EMAIL = gql`
  query GetArtistsByEmail($emails: [String!]!) {
    getArtistsByEmail(emails: $emails) {
      id
      name
      email
      username
    }
  }
`;

const ADD_COLLAB_SENT = gql`
  mutation ($id: String!, $collabsSent: [String]) {
    addCollabSent(id: $id, collabsSent: $collabsSent) {
      collabsSent
    }
  }
`;

const ADD_COLLAB_RECEIVED = gql`
  mutation ($id: String!, $collabsReceived: [String]) {
    addCollabReceived(id: $id, collabsReceived: $collabsReceived) {
      collabsReceived
    }
  }
`;

const ArtistProfile = ({
  id,
  name,
  email,
  username,
  location,
  bio,
  imgSrc,
  trackId,
  badgeId,
  roles,
  genres,
  experience,
  streamings,
  createdAt,
  udpatedAt,
  dob,
  status,
  collabsReceived: artistCollabsReceived,
  collabsSent: artistCollabsSent,
}: Artist) => {
  const router = useRouter();
  const [playing, setPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const { user } = useUser();

  // Queries
  const { data: collabsSentData } = useQuery(GET_COLLABS, {
    variables: { email: user?.email },
  });

  // Logged in user info
  const userId = collabsSentData?.getArtistByEmail.id;
  const collabsSent = collabsSentData?.getArtistByEmail.collabsSent;
  const collabsReceived = collabsSentData?.getArtistByEmail.collabsReceived;

  const { data: collabsSentArtistData } = useQuery(GET_ARTISTS_BY_EMAIL, {
    variables: { emails: collabsSent },
  });
  const { data: collabsReceievedArtistData } = useQuery(GET_ARTISTS_BY_EMAIL, {
    variables: {
      emails: collabsReceived,
    },
  });

  // Mutations
  const [addCollabSent] = useMutation(ADD_COLLAB_SENT, {
    variables: {
      id: userId,
      collabsSent,
    },
  });
  const [addCollabReceived] = useMutation(ADD_COLLAB_RECEIVED, {
    variables: {
      id: userId,
      collabsReceived,
    },
  });

  const isUserProfile = () => {
    return user?.email == email;
  };

  const isDiscoverPage = () => {
    return router.pathname === '/discover';
  };

  const handleProfileClick = (e: any) => {
    const target = e.target as HTMLElement;
    if (
      !modalOpen &&
      target.id != 'button' &&
      target.tagName != 'A' &&
      target.tagName != 'path' &&
      target.tagName != 'svg'
    ) {
      router.push('/' + username);
    }
  };

  const playHandler = () => {
    setPlaying((playing: any) => !playing);
  };

  const renderAvatar = () => {
    return (
      <div
        className="avatar-size relative rounded-full 
          min-w-[95px] min-h-[95px]
          sm:min-w-[135px] sm:min-h-[135px]
          md:min-w-[240px] md:min-h-[240px]"
      >
        <Image
          src={imgSrc || '/default_artist_img.jpg'}
          layout="fill"
          alt="Profile"
          className="rounded-full"
        />
        <div
          onClick={playHandler}
          className="rounded-full flex justify-center items-center md:w-60 md:h-60"
        >
          {/* TODO: Fix trackSig player UX */}
          {/* {playing ? (
            <>
              <IconContext.Provider
                value={{
                  size: '6em',
                  color: 'red',
                  className: 'hidden md:block opacity-50',
                }}
              >
                <VscDebugPause />
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  size: '2.85em',
                  color: 'red',
                  className: 'md:hidden opacity-50',
                }}
              >
                <VscDebugPause />
              </IconContext.Provider>
            </>
          ) : (
            <>
              <IconContext.Provider
                value={{
                  size: '4em',
                  color: 'red',
                  className: 'ml-4 hidden md:block opacity-50',
                }}
              >
                <FaPlay />
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  size: '2em',
                  color: 'red',
                  className: 'ml-1 md:hidden opacity-50',
                }}
              >
                <FaPlay />
              </IconContext.Provider>
            </>
          )} */}
        </div>
      </div>
    );
  };

  const renderInfo = () => {
    const nameComponent =
      router.pathname === '/discover' ? (
        <h1
          onClick={() => router.push('/' + username)}
          className="inline text-left cursor-pointer"
        >
          {name || user?.nickname + ' '}
          {badgeId && (
            <IconContext.Provider
              value={{
                color: 'red',
                className: 'inline',
              }}
            >
              <MdVerified />
            </IconContext.Provider>
          )}
        </h1>
      ) : (
        <h1 className="inline text-left">
          {name || user?.nickname + ' '}
          {badgeId && (
            <IconContext.Provider
              value={{
                color: 'red',
                className: 'inline',
              }}
            >
              <MdVerified />
            </IconContext.Provider>
          )}
        </h1>
      );

    return (
      <div className="flex flex-col justify-start items-start ml-5">
        <div className="flex items-center">
          {nameComponent}
          {/* <h1 className="inline text-left">
            {name || user?.nickname + ' '}
            {badgeId && (
              <IconContext.Provider
                value={{
                  color: 'red',
                  className: 'inline',
                }}
              >
                <MdVerified />
              </IconContext.Provider>
            )}
          </h1> */}
        </div>
        <h3 className="flex flex-wrap font-medium items-start mt-1">
          <div className="flex items-center">
            <HiOutlineAtSymbol />
            {username}
          </div>
          {location && (
            <>
              <div className="mx-2 font-bold"> </div>
              <div className="flex items-center">
                <TbCurrentLocation />
                {location}
              </div>
            </>
          )}
        </h3>

        {/* Desktop only */}
        <div className="hidden sm:block w-full text-left mt-3">
          {renderMoreInfo()}
        </div>
      </div>
    );
  };

  const renderMoreInfo = () => {
    return (
      <>
        <div className={isDiscoverPage() ? 'line-clamp-4' : ''}>{bio}</div>
        <div className="w-full flex flex-wrap mb-3 mt-4">
          <Experience experience={experience} />
          {roles?.map((role: any, id: any) => (
            <Role key={id} role={role} />
          ))}
          {genres?.map((genre: any, id: any) => (
            <Genre key={id} genre={genre} />
          ))}
        </div>
        {renderCollab()}
      </>
    );
  };

  const renderStreamings = () => {
    let spotify, appleMusic, soundcloud, youtube, bandcamp;
    const streamingContainerCLass =
      'flex cursor-pointer font-bold mr-1 hover:scale-110 transition:transform';

    const setHttps = (url: string) => {
      if (url.search('^http[s]?') == -1) {
        url = 'https://' + url;
      }
      return url;
    };

    streamings?.map((platform: string) => {
      if (platform) {
        let url = new URL(setHttps(platform));

        if (platform.includes('spotify')) {
          spotify = url;
        }
        if (platform.includes('apple')) {
          appleMusic = url;
        }
        if (platform.includes('soundcloud')) {
          soundcloud = url;
        }
        if (platform.includes('youtube')) {
          youtube = url;
        }
        if (platform.includes('bandcamp')) {
          bandcamp = url;
        }
      }
    });

    if (spotify || appleMusic || soundcloud || youtube || bandcamp) {
      return (
        <div className="w-full flex pl-5">
          {spotify && (
            <div className={streamingContainerCLass}>
              <IconContext.Provider
                value={{
                  size: '1.75em',
                  className: 'text-spotify mr-2',
                }}
              >
                <a href={spotify} target="__blank">
                  <SiSpotify />
                </a>
              </IconContext.Provider>
            </div>
          )}

          {appleMusic && (
            <div className={streamingContainerCLass}>
              <IconContext.Provider
                value={{
                  size: '1.75em',
                  className: 'text-appleMusic mr-2',
                }}
              >
                <a href={appleMusic} target="__blank">
                  <SiApplemusic />
                </a>
              </IconContext.Provider>
            </div>
          )}

          {soundcloud && (
            <div className={streamingContainerCLass}>
              <IconContext.Provider
                value={{
                  size: '1.75em',
                  className: 'text-soundcloud mr-2',
                }}
              >
                <a href={soundcloud} target="__blank">
                  <SiSoundcloud />
                </a>
              </IconContext.Provider>
            </div>
          )}

          {youtube && (
            <div className={streamingContainerCLass}>
              <IconContext.Provider
                value={{
                  size: '1.75em',
                  className: 'text-primary mr-2',
                }}
              >
                <a href={youtube} target="__blank">
                  <SiYoutube />
                </a>
              </IconContext.Provider>
            </div>
          )}

          {bandcamp && (
            <div className={streamingContainerCLass}>
              <IconContext.Provider
                value={{
                  size: '1.75em',
                  className: 'text-bandcamp mr-2',
                }}
              >
                <a href={bandcamp} target="__blank">
                  <SiBandcamp />
                </a>
              </IconContext.Provider>
            </div>
          )}
        </div>
      );
    }
  };

  const renderCollab = () => {
    // Collab artist data
    const collabsSentObj = Object.values(
      collabsSentArtistData?.getArtistsByEmail || {}
    );
    const collabsReceivedObj = Object.values(
      collabsReceievedArtistData?.getArtistsByEmail || {}
    );

    // Filter and set objects to render
    const collabs = collabsSentObj.filter((sentCollab: any) =>
      collabsReceivedObj
        .map((receivedCollab: any) => receivedCollab.username)
        .includes(sentCollab.username)
    );
    const sent = collabsSentObj.filter(
      (collabSent: any) =>
        !collabs
          .map((collab: any) => collab.username)
          .includes(collabSent.username)
    );
    const received = collabsReceivedObj.filter(
      (collabReceived: any) =>
        !collabs
          .map((collab: any) => collab.username)
          .includes(collabReceived.username)
    );

    // TODO: Store in state so component rerenders on data change
    const isCollabed = () => {
      return (
        collabs.filter((collab: any) => collab.username === username).length > 0
      );
    };

    // TODO: Store in state so component rerenders on data change
    const isSent = () => {
      return (
        !isCollabed() &&
        sent.filter((collab: any) => collab.username === username).length > 0
      );
    };

    // TODO: Store in state so component rerenders on data change
    const isRceieved = () => {
      return (
        !isCollabed() &&
        received.filter((collab: any) => collab.username === username).length >
          0
      );
    };

    const renderCta = () => {
      const handleCollabClick = () => {
        setModalType('collab');
        setModalOpen(true);
      };

      const handleSentClick = () => {
        setModalType('sent');
        setModalOpen(true);
      };

      const handleReceivedClick = () => {
        setModalType('received');
        setModalOpen(true);
      };

      const handleMessageClick = () => {
        setModalType('message');
        setModalOpen(true);
      };

      const renderModal = (modalType: any) => {
        let modal = null;
        const containerClass = 'flex flex-col gap-10';
        const ctaContainerClass = 'flex justify-center items-center gap-10';

        const handleRemoveFromSent = () => {
          const variables = {
            id: userId,
            collabsSent: [
              ...collabsSent.filter((collab: any) => collab != email),
            ],
          };
          addCollabSent({ variables });

          // Remove logged in user from receiving user's collabsReceived
          const artistVariables = {
            id,
            collabsReceived: [
              ...artistCollabsReceived.filter(
                (collab: any) => collab != user?.email
              ),
            ],
          };
          addCollabReceived({ variables: artistVariables });

          // TODO: Alert or toast saying that you collabed with {name}
          setModalOpen(false);
          router.push('/' + username);
        };

        const handleRemoveFromReceived = () => {
          const variables = {
            id: userId,
            collabsReceived: [
              ...collabsReceived.filter((collab: any) => collab != email),
            ],
          };
          addCollabReceived({ variables });

          // Remove logged in user from receiving user's collabsSent
          const artistVariables = {
            id,
            collabsSent: [
              ...artistCollabsSent.filter(
                (collab: any) => collab != user?.email
              ),
            ],
          };
          addCollabSent({ variables: artistVariables });

          // TODO: Alert or toast saying that you collabed with {name}
          setModalOpen(false);
          router.push('/' + username);
        };

        const handleAddToSent = () => {
          const variables = {
            id: userId,
            collabsSent: [...collabsSent, email],
          };
          addCollabSent({ variables });

          // TODO: Test
          // Add logged in user to receiving user's collabsReceived
          const artistVariables = {
            id,
            collabsReceived: [...artistCollabsReceived, user?.email],
          };
          addCollabReceived({ variables: artistVariables });

          // TODO: Alert or toast saying that you collabed with {name}
          setModalOpen(false);
          router.push('/' + username);
        };

        switch (modalType) {
          case 'collab':
            if (!user) {
              modal = (
                <div className={containerClass}>
                  <div>
                    You must be logged in to collab with <b>{name}</b>.
                  </div>
                  <div className={ctaContainerClass}>
                    <div
                      id="button"
                      onClick={() => router.push('/api/auth/login')}
                      className="cta-button"
                    >
                      Log in
                    </div>
                    <div
                      id="button"
                      onClick={() => setModalOpen(false)}
                      className="text-button"
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              );
            } else {
              modal = (
                <div className={containerClass}>
                  <div>
                    Send collab request to <b>{name}</b>?
                  </div>
                  <div className={ctaContainerClass}>
                    <div
                      id="button"
                      onClick={() => handleAddToSent()}
                      className="cta-button"
                    >
                      Collab
                    </div>
                    <div
                      id="button"
                      onClick={() => setModalOpen(false)}
                      className="text-button"
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              );
            }
            break;

          case 'sent':
            modal = (
              <div className={containerClass}>
                <div>
                  Cancel collab request from <b>{name}</b>?
                </div>
                <div className={ctaContainerClass}>
                  <div
                    id="button"
                    onClick={() => handleRemoveFromSent()}
                    className="text-button"
                  >
                    Yes
                  </div>
                  <div
                    id="button"
                    onClick={() => setModalOpen(false)}
                    className="cta-button"
                  >
                    No
                  </div>
                </div>
              </div>
            );
            break;

          case 'received':
            modal = (
              <div className={containerClass}>
                <div>
                  Accept or Reject collab request from <b>{name}</b>?
                </div>
                <div className={ctaContainerClass}>
                  <div
                    id="button"
                    onClick={() => handleAddToSent()}
                    className="cta-button"
                  >
                    Accept
                  </div>
                  <div
                    id="button"
                    onClick={() => handleRemoveFromReceived()}
                    className="text-button"
                  >
                    Reject
                  </div>
                  <div
                    id="button"
                    onClick={() => setModalOpen(false)}
                    className="text-button"
                  >
                    Cancel
                  </div>
                </div>
              </div>
            );
            break;

          case 'message':
            modal = (
              <div className={containerClass}>
                <div className="flex flex-col gap-5">
                  <div>
                    The Messaging Collabs feature is not yet available... For
                    now you can reach out to <b>{name}</b> through the{' '}
                    <a
                      className="text-button"
                      href="https://discord.com/invite/KNUG3yTsT8/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Underground Universal Discord
                    </a>
                    .
                  </div>
                  <div>
                    Or you can contact them directly at <b>{email}</b>.
                  </div>
                </div>
                <div className={ctaContainerClass}>
                  <div
                    id="button"
                    onClick={() => setModalOpen(false)}
                    className="text-button"
                  >
                    Close
                  </div>
                </div>
              </div>
            );
            break;

          default:
            break;
        }

        return modal;
      };

      return (
        <div>
          {modalOpen && (
            <Modal
              isOpen={modalOpen}
              handleClose={() => setModalOpen(!modalOpen)}
            >
              {modalType && renderModal(modalType)}
            </Modal>
          )}

          {!isUserProfile() && !isCollabed() && !isSent() && !isRceieved() && (
            <div id="button" onClick={handleCollabClick} className="cta-button">
              Collab
            </div>
          )}

          {isSent() && (
            <div
              id="button"
              onClick={handleSentClick}
              className="flex items-center text-button-secondary"
            >
              Sent
              <BsCheckLg className="cursor-pointer ml-1" />
            </div>
          )}

          {isRceieved() && (
            <div
              id="button"
              onClick={handleReceivedClick}
              className="text-button"
            >
              Received
            </div>
          )}

          {isCollabed() && (
            <div
              id="button"
              onClick={handleMessageClick}
              className="text-button"
            >
              Message
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="flex items-center">
        {renderCta()}
        {renderStreamings()}
      </div>
    );
  };

  return (
    <div
      className={isDiscoverPage() ? 'card cursor-pointer' : ''}
      onClick={(e) => handleProfileClick(e)}
    >
      {/* Top container */}
      <div className="flex items-center sm:items-start justify-start w-full mb-5 md:mb-0">
        {renderAvatar()}
        {renderInfo()}
      </div>
      {/* TODO: Add remove collabs if collabed */}

      {/* Mobile only */}
      <div className="sm:hidden sm:block w-full text-left">
        {renderMoreInfo()}
      </div>
      {/* TODO: Mobile - Add remove collabs if collabed */}
    </div>
  );
};

export default ArtistProfile;
