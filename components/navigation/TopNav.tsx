import { useTheme } from 'next-themes';

const TopNav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between py-3 px-5 sm:justify-end sm:py-7 sm:px-12">
      <div className="sm:hidden">*Logo*</div>
      <div className="flex gap-6">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <h3>Theme</h3>
        </button>
        <div>Log in</div>
        <div>Join</div>
      </div>
    </div>
  );
};

export default TopNav;
