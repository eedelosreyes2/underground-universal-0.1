import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons';
import { FaLocationArrow } from 'react-icons/fa';
import { MdLibraryMusic, MdPeopleAlt } from 'react-icons/md';
import { RiHeadphoneFill } from 'react-icons/ri';
import ActiveLink from './ActiveLink';

const Nav = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <div
      className="z-20 min-h-screen w-[200px] hidden
      bg-nav-light dark:bg-nav-dark md:block z-50"
    >
      <div className="fixed">
        <div
          onClick={() => router.push('/discover')}
          className="cursor-pointer pt-8 p-4"
        >
          {theme === 'dark' ? (
            <Image src="/logo.png" width={142} height={42} alt="Logo" />
          ) : (
            <Image src="/logo_light.png" width={142} height={42} alt="Logo" />
          )}
        </div>

        <ActiveLink href="/discover">
          <div className="flex items-center cursor-pointer gap-3 p-4 pt-4">
            <div className="w-[28px]">
              <IconContext.Provider
                value={{ size: '1.35em', className: 'ml-1' }}
              >
                <FaLocationArrow />
              </IconContext.Provider>
            </div>
            <h4>Discover</h4>
          </div>
        </ActiveLink>

        <ActiveLink href="/studios">
          <div className="flex items-center cursor-pointer gap-3 p-4">
            <IconContext.Provider value={{ size: '1.75em' }}>
              <RiHeadphoneFill />
            </IconContext.Provider>
            <h4>Studios</h4>
          </div>
        </ActiveLink>

        <ActiveLink href="/library">
          <div className="flex items-center cursor-pointer gap-3 p-4">
            <IconContext.Provider value={{ size: '1.75em' }}>
              <MdLibraryMusic />
            </IconContext.Provider>
            <h4>Library</h4>
          </div>
        </ActiveLink>

        <ActiveLink href="/collabs">
          <div className="flex items-center cursor-pointer gap-3 p-4">
            <IconContext.Provider value={{ size: '1.75em' }}>
              <MdPeopleAlt />
            </IconContext.Provider>
            <h4>Collabs</h4>
          </div>
        </ActiveLink>
      </div>
    </div>
  );
};

export default Nav;
