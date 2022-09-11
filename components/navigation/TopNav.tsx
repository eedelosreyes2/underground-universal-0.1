import { useTheme } from 'next-themes';
import { HiMoon, HiOutlineMoon } from 'react-icons/hi';

const TopNav = () => {
  const { theme, setTheme } = useTheme();

  const loggedIn = false;

  return (
    <div className="absolute right-0 left-0 flex justify-between py-3 px-5 sm:justify-end sm:py-7 sm:px-12">
      <div className="sm:hidden">*Logo*</div>
      <div className="flex items-center gap-6">
        <button
          className="mt-1"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <HiMoon /> : <HiOutlineMoon />}
        </button>

        {loggedIn ? (
          <div>Profile</div>
        ) : (
          <>
            <a href="/login">
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
