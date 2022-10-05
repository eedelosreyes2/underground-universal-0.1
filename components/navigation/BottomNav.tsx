import { IconContext } from 'react-icons';
import { RiHeadphoneFill } from 'react-icons/ri';
import { MdLibraryMusic } from 'react-icons/md';
import { MdPeopleAlt } from 'react-icons/md';
import { FaLocationArrow } from 'react-icons/fa';
import ActiveLink from './ActiveLink';

const BottomNav = () => {
  return (
    <div
      className="absolute bottom-0 right-0 left-0 
      flex justify-evenly align-middle
      bg-nav-light dark:bg-nav-dark md:hidden"
    >
      <ActiveLink href="/discover">
        <div className="p-3 pt-4">
          <IconContext.Provider value={{ size: '1.35em' }}>
            <FaLocationArrow />
          </IconContext.Provider>
        </div>
      </ActiveLink>

      <ActiveLink href="/studios">
        <div className="p-3">
          <IconContext.Provider value={{ size: '1.75em' }}>
            <RiHeadphoneFill />
          </IconContext.Provider>
        </div>
      </ActiveLink>

      <ActiveLink href="/library">
        <div className="p-3">
          <IconContext.Provider value={{ size: '1.75em' }}>
            <MdLibraryMusic />
          </IconContext.Provider>
        </div>
      </ActiveLink>

      <ActiveLink href="/collabs">
        <div className="p-3">
          <IconContext.Provider value={{ size: '1.75em' }}>
            <MdPeopleAlt />
          </IconContext.Provider>
        </div>
      </ActiveLink>
    </div>
  );
};

export default BottomNav;
