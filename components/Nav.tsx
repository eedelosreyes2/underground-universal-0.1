import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Nav = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const LeftNav = () => {
    return (
      <div className="min-h-screen fixed w-48 hidden bg-nav-light dark:bg-nav-dark sm:block">
        LeftNav
      </div>
    );
  };

  const TopNav = () => {
    return (
      <div className="max-w-2xl border mx-auto">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <h3>Theme</h3>
        </button>
      </div>
    );
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <LeftNav />
      <TopNav />
    </>
  );
};

export default Nav;
