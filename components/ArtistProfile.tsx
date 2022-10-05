import { useUser } from '@auth0/nextjs-auth0';
import { Role, Genre, Experience } from '@prisma/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { HiOutlineAtSymbol } from 'react-icons/hi';
import { MdVerified } from 'react-icons/md';
import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiYoutube,
  SiBandcamp,
} from 'react-icons/si';
import Layout from './Layout';

interface Props {
  id: string;
  name: string;
  email: string;
  username: string;
  location: string;
  bio: string;
  imgSrc?: string;
  trackSig?: any;
  badge?: any;
  roles: [string];
  genres: [string];
  experience: string;
  streamings: [string];
}

const ArtistProfile = ({
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
}: Props) => {
  const router = useRouter();
  const [playing, setPlaying] = useState(true);
  const { user } = useUser();
  //   console.log(
  //     id,
  //     name,
  //     email,
  //     username,
  //     location,
  //     bio,
  //     imgSrc,
  //     trackSig,
  //     badge,
  //     roles,
  //     genres,
  //     experience,
  //     streamings
  //   );

  const isUserProfile = () => {
    return user?.email == email;
  };

  const isProfileComplete = () => {
    return username && name && location;
  };

  const playHandler = () => {
    setPlaying((playing: any) => !playing);
  };

  const renderAvatar = () => {
    return (
      <div className="w-24 h-24 relative border border-secondary rounded-full sm:w-60 sm:h-60">
        {/* <Image
          src={imgSrc || '/default_artist_img.jpg'}
          layout="fill"
          alt="Profile"
          className="rounded-full"
        /> */}
        <div
          onClick={playHandler}
          className="rounded-full flex justify-center items-center sm:w-60 sm:h-60"
        >
          {/* TODO: Fix trackSig player UX */}
          {/* {playing ? (
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
          )} */}
        </div>
      </div>
    );
  };

  const renderInfo = () => {
    return (
      <div className="flex flex-col justify-start items-start ml-5">
        <div className="flex items-center">
          <h1 className="inline text-left">
            {name || user?.nickname + ' '}
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
            {username}
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
          {/* {roles?.map((role: any, id: any) => (
            <Role key={id} role={role} />
          ))}
          {genres?.map((genre: any, id: any) => (
            <Genre key={id} genre={genre} />
          ))}
          <Experience experience={experience} /> */}
        </div>
        {bio}
        {renderStreamings()}
      </>
    );
  };

  const renderStreamings = () => {
    let spotify, appleMusic, soundcloud, youtube, bandcamp;

    const setHttps = (url: string) => {
      if (url.search('/^http[s]?:///') == -1) {
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
    <>
      {/* Top container */}
      <div className="flex items-center justify-start w-full mb-5">
        {renderAvatar()}
        {renderInfo()}
      </div>

      {/* Mobile only */}
      <div className="sm:hidden sm:block w-full text-left">
        {renderMoreInfo()}
      </div>
    </>
  );
};

export default ArtistProfile;
