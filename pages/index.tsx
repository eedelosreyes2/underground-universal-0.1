import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div>
      <Header />
      <Layout>
        <div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <h3>Theme</h3>
          </button>
        </div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </Layout>
    </div>
  );
};

export default Home;
