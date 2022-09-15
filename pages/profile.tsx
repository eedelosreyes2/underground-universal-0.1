import { gql, useQuery } from '@apollo/client';
import { getSession, useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';
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

const MeQuery = gql`
  query {
    artists {
      id
      email
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
  const { data, loading, error } = useQuery(MeQuery);
  const [playing, setPlaying] = useState(true);
  const user = useUser();

  console.log(data);

  const playHandler = () => {
    setPlaying((playing) => !playing);
  };

  const renderAvatar = () => {
    return (
      <div className="w-24 h-24 border border-primary rounded-full sm:w-60 sm:h-60">
        <div
          onClick={playHandler}
          className="cursor-pointer w-24 h-24 rounded-full flex justify-center items-center 
            sm:w-60 sm:h-60 transition-all hover:scale-125"
        >
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
            Zaction Bronson Bronson{' '}
            <IconContext.Provider
              value={{
                color: 'red',
                className: 'inline',
              }}
            >
              <MdVerified />
            </IconContext.Provider>
          </h1>
        </div>
        <div className="flex gap-1 mt-1 mb-2 items-center">
          <IoIosPin />
          Martinez, Ca
        </div>
        <div className="w-full flex">
          <div className="border border-primary rounded-full px-3 mr-2">
            Rapper
          </div>
          <div className="border border-secondary rounded-full px-3 mr-2">
            Hiphop
          </div>
          <div className="border border-player rounded-full px-3 mr-2">
            Player
          </div>
        </div>
        <div className="hidden sm:block w-full text-left mt-5">
          A sentence or two on who I am and who I am looking to collab with.
          This will take up the space that the embedded player would, but now I
          moved that.
        </div>
      </div>
    );
  };

  const renderStreamings = () => {
    return (
      <div className="w-full flex flex-wrap">
        <div className="flex cursor-pointer font-bold mr-3">
          <IconContext.Provider
            value={{ size: '1.75em', className: 'text-spotify mr-2' }}
          >
            <SiSpotify /> Zaction Bronson
          </IconContext.Provider>
        </div>
        <div className="flex cursor-pointer font-bold mr-3">
          <IconContext.Provider
            value={{ size: '1.75em', className: 'text-appleMusic mr-2' }}
          >
            <SiApplemusic /> Zaction Bronson
          </IconContext.Provider>
        </div>
        <div className="flex cursor-pointer font-bold mr-3">
          <IconContext.Provider
            value={{ size: '1.75em', className: 'text-soundcloud mr-2' }}
          >
            <SiSoundcloud /> Zaction Bronson
          </IconContext.Provider>
        </div>
        <div className="flex cursor-pointer font-bold mr-3">
          <IconContext.Provider
            value={{ size: '1.75em', className: 'text-primary mr-2' }}
          >
            <SiYoutube /> Zaction Bronson
          </IconContext.Provider>
        </div>
        <div className="flex cursor-pointer font-bold mr-3">
          <IconContext.Provider
            value={{ size: '1.75em', className: 'text-bandcamp mr-2' }}
          >
            <SiBandcamp /> Zaction Bronson
          </IconContext.Provider>
        </div>
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
                A sentence or two on who I am and who I am looking to collab
                with. This will take up the space that the embedded player
                would, but now I moved that.
              </div>

              {renderStreamings()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;