import { useTheme } from 'next-themes';

const TopNav = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-end">
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <h3>Theme</h3>
      </button>
    </div>
  );
};

export default TopNav;
