import { useUser } from '@auth0/nextjs-auth0';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { HiMoon, HiOutlineMoon } from 'react-icons/hi';

const TopNav = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  return (
    <div className="absolute right-0 left-0 flex justify-between py-3 px-5 sm:justify-end sm:py-7 sm:px-12">
      <div className="sm:hidden">*Logo*</div>
      <div className="flex gap-6">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <HiMoon /> : <HiOutlineMoon />}
        </button>

        {user ? (
          <a
            href="profile"
            className="h-8 border border-secondary rounded-full overflow-hidden"
          >
            <Image src={user.picture!} width={32} height={32} alt="Profile" />
          </a>
        ) : (
          <>
            <a href="/api/auth/login">
              <div className="cursor-pointer">Log in</div>
            </a>
            <a href="/join">
              <div className="rounded-2xl cursor-pointer bg-primary font-bold text-white px-4 py-2">
                Join
              </div>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNav;
