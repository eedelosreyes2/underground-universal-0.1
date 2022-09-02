import { IconContext } from 'react-icons';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { RiHeadphoneFill } from 'react-icons/ri';
import { MdOutlineLibraryMusic } from 'react-icons/md';
import { MdPeopleAlt } from 'react-icons/md';

const BottomNav = () => {
  return (
    <div
      className="absolute bottom-0 right-0 left-0 
      flex justify-evenly align-middle
      bg-nav-light dark:bg-nav-dark sm:hidden"
    >
      <div className="p-3 px-6">
        <IconContext.Provider value={{ size: '1.75em' }}>
          <RiCompassDiscoverLine />
        </IconContext.Provider>
      </div>
      <div className="p-3 px-6">
        <IconContext.Provider value={{ size: '1.75em' }}>
          <RiHeadphoneFill />
        </IconContext.Provider>
      </div>
      <div className="p-3 px-6">
        <IconContext.Provider value={{ size: '1.75em' }}>
          <MdOutlineLibraryMusic />
        </IconContext.Provider>
      </div>
      <div className="p-3 px-6">
        <IconContext.Provider value={{ size: '1.75em' }}>
          <MdPeopleAlt />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default BottomNav;
