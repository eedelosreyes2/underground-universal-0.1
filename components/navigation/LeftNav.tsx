import { IconContext } from 'react-icons';
import { FaLocationArrow } from 'react-icons/fa';
import { MdLibraryMusic, MdPeopleAlt } from 'react-icons/md';
import { RiHeadphoneFill } from 'react-icons/ri';
import ActiveLink from './ActiveLink';

const Nav = () => {
  return (
    <div
      className="min-h-screen w-48 hidden 
      bg-nav-light dark:bg-nav-dark sm:block"
    >
      <div className="py-8 p-3">*Logo*</div>

      <ActiveLink href="/discover">
        <div className="flex items-center cursor-pointer gap-3 p-4 pt-4">
          <div className="w-[28px]">
            <IconContext.Provider value={{ size: '1.35em', className: 'ml-1' }}>
              <FaLocationArrow />
            </IconContext.Provider>
          </div>
          <h2>Discover</h2>
        </div>
      </ActiveLink>

      <ActiveLink href="/studios">
        <div className="flex items-center cursor-pointer gap-3 p-4">
          <IconContext.Provider value={{ size: '1.75em' }}>
            <RiHeadphoneFill />
          </IconContext.Provider>
          <h2>Studios</h2>
        </div>
      </ActiveLink>

      <ActiveLink href="/library">
        <div className="flex items-center cursor-pointer gap-3 p-4">
          <IconContext.Provider value={{ size: '1.75em' }}>
            <MdLibraryMusic />
          </IconContext.Provider>
          <h2>Library</h2>
        </div>
      </ActiveLink>

      <ActiveLink href="/collabs">
        <div className="flex items-center cursor-pointer gap-3 p-4">
          <IconContext.Provider value={{ size: '1.75em' }}>
            <MdPeopleAlt />
          </IconContext.Provider>
          <h2>Collabs</h2>
        </div>
      </ActiveLink>
    </div>
  );
};

export default Nav;
