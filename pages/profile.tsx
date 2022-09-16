import { gql, useQuery } from '@apollo/client';
import { getSession, useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import { composeMiddlewareFns } from 'nexus/dist/plugin';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { FaPlay } from 'react-icons/fa';
import { IoIosPin } from 'react-icons/io';
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

// TODO: Optimize query to only get current artist
// TODO: Add imgSrc, trackSig, and badge to query
const GET_ALL_ARTISTS = gql`
  query {
    artists {
      id
      email
      name
      location
      bio
      role
      genres
      level
      streamings
    }
  }
`;

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: any;
  res: any;
}) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

const profile = () => {
  const { data, loading, error } = useQuery(GET_ALL_ARTISTS);
  const { user } = useUser();
  const [playing, setPlaying] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: '',
    location: '',
    bio: '',
    imgSrc: '',
    trackSig: null,
    badge: null,
    role: '',
    genres: [],
    level: '',
    streamings: [],
  });
  const {
    name,
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

  // TODO: Remove once query is optimized
  const getUserProfile = data?.artists.filter((artist: any) => {
    return artist.email == user?.email;
  });

  useEffect(() => {
    if (getUserProfile?.length) {
      let userProfile = { ...getUserProfile[0] };
      if (userProfile.name == null) {
        userProfile.name = user?.nickname;
      }
      if (userProfile.imgSrc == null) {
        userProfile.imgSrc = user?.picture;
      }
      setUserProfile(userProfile);
    }
  }, [data]);

  console.log(userProfile);

  const playHandler = () => {
    setPlaying((playing) => !playing);
  };

  const renderAvatar = () => {
    return (
      <div className="w-24 h-24 relative border border-primary rounded-full sm:w-60 sm:h-60">
        <Image
          src={userProfile.imgSrc!}
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
        <div className="flex gap-1 mt-1 mb-2 items-center">
          <IoIosPin />
          {location}
        </div>
        <div className="w-full flex flex-wrap">
          <Role role={role} />
          <Level level={level} />
          {genres.map((genre, id) => (
            <Genre key={id} genre={genre} />
          ))}
        </div>
        <div className="hidden sm:block w-full text-left mt-5">
          {bio}
          {renderStreamings()}
        </div>
      </div>
    );
  };

  const renderStreamings = () => {
    let spotify, appleMusic, soundcloud, youtube, bandcamp;

    streamings.map((platform: string) => {
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
    });

    return (
      <div className="w-full flex flex-wrap mt-10">
        {spotify && (
          <div className="flex cursor-pointer font-bold mr-3">
            <IconContext.Provider
              value={{
                size: '1.75em',
                className: 'hover:scale-125 text-spotify mr-2',
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
                className: 'hover:scale-125 text-appleMusic mr-2',
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
                className: 'hover:scale-125 text-soundcloud mr-2',
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
                className: 'hover:scale-125 text-primary mr-2',
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
                className: 'hover:scale-125 text-bandcamp mr-2',
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
        <div className="flex flex-col items-center text-center w-full pt-10">
          <div className="w-full flex flex-col items-center">
            <div className="w-full sm:max-w-3xl flex flex-col rounded-3xl px-3 mb-10 lg:px-10">
              <div className="text-left pb-16">
                <p className="text-button">Edit profile</p>
              </div>
              {/* Top container */}
              <div className="flex items-center mb-5">
                {renderAvatar()}
                {renderInfo()}
              </div>

              {/* bio mobile viewport */}
              <div className="sm:hidden w-full text-left mb-5">
                {bio}
                {renderStreamings()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
