import { useTheme } from 'next-themes';
import { IconContext } from 'react-icons';
import { HiMoon, HiOutlineMoon } from 'react-icons/hi';

const TopNav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute right-0 left-0 flex justify-between py-3 px-5 sm:justify-end sm:py-7 sm:px-12">
      <div className="sm:hidden">*Logo*</div>
      <div className="flex gap-6">
        <button
          className="mt-1"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <HiMoon /> : <HiOutlineMoon />}
        </button>
        <div>Log in</div>
        <div>Join</div>
      </div>
    </div>
  );
};

export default TopNav;
