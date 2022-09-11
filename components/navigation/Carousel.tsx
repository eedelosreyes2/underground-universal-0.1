import { useState } from 'react';
import { IconContext } from 'react-icons';
import { VscDebugPause } from 'react-icons/vsc';
import { MdVerified } from 'react-icons/md';
import { IoIosPin } from 'react-icons/io';
import { FaPlay, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {
  SiSpotify,
  SiApplemusic,
  SiSoundcloud,
  SiYoutube,
  SiBandcamp,
} from 'react-icons/si';

const Carousel = () => {
  const [playing, setPlaying] = useState(true);

  const playHandler = () => {
    setPlaying((playing) => !playing);
  };

  const collabHandler = () => {
    console.log('Collab with <Artist.name>');
  };

  const leftHandler = () => {
    console.log('Left');
  };

  const rightHandler = () => {
    console.log('Right');
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

  const renderControl = () => {
    return (
      <div className="flex items-center">
        <div
          onClick={leftHandler}
          className="rounded-full cursor-pointer p-3 transition-all hover:scale-150"
        >
          <IconContext.Provider value={{ size: '1.25em', color: 'red' }}>
            <FaArrowLeft />
          </IconContext.Provider>
        </div>
        <div
          onClick={collabHandler}
          className="max-w-sm rounded-full cursor-pointer font-bold text-white 
            bg-primary px-5 py-3 mx-12 transition-all hover:scale-110"
        >
          Collab with Zaction
        </div>
        <div
          onClick={rightHandler}
          className="rounded-full cursor-pointer p-3 transition-all hover:scale-150"
        >
          <IconContext.Provider value={{ size: '1.25em', color: 'red' }}>
            <FaArrowRight />
          </IconContext.Provider>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div
        className="w-full sm:max-w-3xl flex flex-col rounded-3xl px-3 py-8 mb-10 
        lg:px-10 bg-component-light dark:bg-component-dark"
      >
        {/* Top container */}
        <div className="flex items-center mb-5">
          {renderAvatar()}
          {renderInfo()}
        </div>

        {/* bio mobile viewport */}
        <div className="sm:hidden w-full text-left mb-5">
          A sentence or two on who I am and who I am looking to collab with.
          This will take up the space that the embedded player would, but now I
          moved that.
        </div>

        {renderStreamings()}
      </div>

      {renderControl()}
    </div>
  );
};

export default Carousel;
