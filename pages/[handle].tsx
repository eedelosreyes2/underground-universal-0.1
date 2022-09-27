import { gql, useMutation, useQuery } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaPlay } from 'react-icons/fa';
import { TbMapPin } from 'react-icons/tb';
import { MdVerified } from 'react-icons/md';
import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiYoutube,
  SiBandcamp,
} from 'react-icons/si';
import { VscDebugPause } from 'react-icons/vsc';
import Layout from '../components/Layout';
import Genre from '../components/tags/Genre';
import Level from '../components/tags/Level';
import Role from '../components/tags/Role';
import { HiOutlineAtSymbol } from 'react-icons/hi';
import prisma from '../lib/prisma';

// TODO: Add imgSrc, trackSig, and badge to query
const GET_ARTIST = gql`
  query ($email: String!) {
    getArtistByEmail(email: $email) {
      id
      email
      name
      handle
      location
      bio
      role
      genres
      level
      streamings
    }
  }
`;

const UPDATE_ARTIST = gql`
  mutation (
    $id: String!
    $name: String
    $handle: String
    $location: String
    $bio: String
  ) {
    updateArtist(
      id: $id
      name: $name
      handle: $handle
      location: $location
      bio: $bio
    ) {
      email
      name
      handle
      location
      bio
      role
      genres
      level
      streamings
    }
  }
`;

export const getServerSideProps = async ({ params }: any) => {
  const handle = params.handle;
  const artist = await prisma.artist.findUnique({
    where: { handle },
  });

  const { createdAt, udpatedAt } = artist!;
  if (createdAt) {
    artist!.createdAt = JSON.parse(JSON.stringify(createdAt));
  }
  if (udpatedAt) {
    artist!.udpatedAt = JSON.parse(JSON.stringify(udpatedAt));
  }

  return {
    props: {
      artist,
    },
  };
};

const profile = ({ artist }: any) => {
  const router = useRouter();
  const [playing, setPlaying] = useState(true);
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState({
    id: '',
    name: '',
    handle: '',
    location: '',
    bio: '',
    imgSrc: '',
    trackSig: null,
    badge: null,
    role: '',
    genres: [],
    level: '',
    streamings: [],
  }); // TODO: Get from API once query is optimized
  const {
    id,
    name,
    handle,
    location,
    bio,
    imgSrc,
    trackSig,
    badge,
    role,
    genres,
    level,
    streamings,
  } = userProfile;
  const { data, loading, error } = useQuery(GET_ARTIST, {
    variables: { email: user?.email },
    pollInterval: 500,
  });
  const [
    updateArtist,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(UPDATE_ARTIST, {
    variables: {
      id,
      name,
      handle,
      location,
      bio,
      imgSrc,
      trackSig,
      badge,
      role,
      genres,
      level,
      streamings,
    },
  });

  console.log(artist);

  useEffect(() => {
    if (data) {
      let userProfile = { ...data.artist };
      if (userProfile.name == null) {
        userProfile.name = user?.nickname;
      }
      if (userProfile.handle == null) {
        userProfile.handle = user?.nickname;
      }
      if (userProfile.imgSrc == null) {
        userProfile.imgSrc = user?.picture;
      }
      setUserProfile(userProfile);
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      const variables = {
        id,
        name,
        handle,
        location,
        bio,
        imgSrc,
        trackSig,
        badge,
        role,
        genres,
        level,
        streamings,
      };

      updateArtist({ variables });
    }
  }, [userProfile]);

  const playHandler = () => {
    setPlaying((playing) => !playing);
  };

  const renderPageHeader = () => {
    return (
      <div className="flex justify-between h-10 w-full mb-10">
        <div
          onClick={() => router.push('/settings/profile')}
          className="flex items-center gap-2 text-button"
        >
          Edit profile
        </div>
      </div>
    );
  };

  const renderAvatar = () => {
    return (
      <div className="w-24 h-24 relative border border-primary rounded-full sm:w-60 sm:h-60">
        <Image
          src={imgSrc!}
          layout="fill"
          alt="Profile"
          className="rounded-full"
        />
        <div
          onClick={playHandler}
          className="cursor-pointer w-24 h-24 rounded-full flex justify-center items-center 
            sm:w-60 sm:h-60 transition-all hover:scale-125"
        >
          {/* TODO: Fix trackSig player UX */}
          {playing ? (
            <>
              <IconContext.Provider
                value={{
                  size: '6em',
                  color: 'red',
                  className: 'hidden sm:block opacity-50',
                }}
              >
                <VscDebugPause />
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  size: '2.85em',
                  color: 'red',
                  className: 'sm:hidden opacity-50',
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
                  className: 'ml-4 hidden sm:block opacity-50',
                }}
              >
                <FaPlay />
              </IconContext.Provider>
              <IconContext.Provider
                value={{
                  size: '2em',
                  color: 'red',
                  className: 'ml-1 sm:hidden opacity-50',
                }}
              >
                <FaPlay />
              </IconContext.Provider>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="flex flex-col justify-start items-start ml-5">
        <div className="flex items-center">
          <h1 className="inline text-left">
            {name + ' '}
            {badge && (
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
        </div>
        <h3 className="flex font-medium items-start mt-1">
          <div className="flex items-center">
            <HiOutlineAtSymbol />
            {handle}
          </div>
          {location && (
            <>
              <div className="mx-2 font-bold"> · </div>
              <div className="flex items-center">
                {/* <TbMapPin /> */}
                {location}
              </div>
            </>
          )}
        </h3>
        {/* Desktop only */}
        <div className="hidden sm:block w-full text-left mt-5">
          {renderMoreInfo()}
        </div>
      </div>
    );
  };

  const renderMoreInfo = () => {
    return (
      <>
        <div className="w-full flex flex-wrap mb-3">
          <Role role={role} />
          <Level level={level} />
          {genres?.map((genre, id) => (
            <Genre key={id} genre={genre} />
          ))}
        </div>
        {bio}
        {renderStreamings()}
      </>
    );
  };

  const renderStreamings = () => {
    let spotify, appleMusic, soundcloud, youtube, bandcamp;

    streamings?.map((platform: string) => {
      if (platform) {
        const url = new URL(platform);
        const { hostname } = url;

        if (hostname.includes('spotify')) {
          spotify = platform;
        }
        if (hostname.includes('apple')) {
          appleMusic = platform;
        }
        if (hostname.includes('soundcloud')) {
          soundcloud = platform;
        }
        if (hostname.includes('youtube')) {
          youtube = platform;
        }
        if (hostname.includes('bandcamp')) {
          bandcamp = platform;
        }
      }
    });

    return (
      <div className="w-full flex flex-wrap mt-5">
        {spotify && (
          <div className="flex cursor-pointer font-bold mr-3">
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
          <div className="flex cursor-pointer font-bold mr-3">
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
          <div className="flex cursor-pointer font-bold mr-3">
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
          <div className="flex cursor-pointer font-bold mr-3">
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
          <div className="flex cursor-pointer font-bold mr-3">
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
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          {renderPageHeader()}

          {/* Top container */}
          <div className="flex items-center mb-5">
            {renderAvatar()}
            {renderInfo()}
          </div>

          {/* Mobile only */}
          <div className="sm:hidden sm:block w-full text-left">
            {renderMoreInfo()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
