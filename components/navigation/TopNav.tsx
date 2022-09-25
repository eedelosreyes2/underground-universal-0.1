import { useUser } from '@auth0/nextjs-auth0';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiMoon, HiOutlineMoon } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';

const TopNav = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();
  const router = useRouter();

  // TODO: Update this since edit profile page
  const profileBorder =
    'h-8 cursor-pointer border rounded-full overflow-hidden ' +
    (router.pathname === '/profile' || router.pathname === '/settings/profile'
      ? 'border-primary'
      : 'border-secondary');

  const handleSettingsClick = () => {
    router.push('/settings');
  };

  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="absolute right-0 left-0 flex justify-between py-3 px-5 sm:justify-end sm:py-7 sm:px-12">
      <div className="sm:hidden">*Logo*</div>
      <div className="flex gap-6">
        <div
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center cursor-pointer"
        >
          {theme === 'dark' ? <HiMoon /> : <HiOutlineMoon />}
        </div>

        <div
          onClick={handleSettingsClick}
          className={
            'flex items-center cursor-pointer ' +
            (router.pathname === '/settings' ? 'text-primary' : '')
          }
        >
          <FiSettings />
        </div>

        {/* TODO: Get profile picture from userProfile */}
        {user ? (
          <div onClick={handleProfileClick} className={profileBorder}>
            <Image src={user.picture!} width={32} height={32} alt="Profile" />
          </div>
        ) : (
          <>
            <a
              href="/api/auth/login"
              className="flex items-center cursor-pointer"
            >
              Log in
            </a>
            <a href="/join">
              <div className="cta-button">Join</div>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNav;
