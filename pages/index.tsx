import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TopNav from '../components/navigation/TopNav';

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Layout>
      <div className="w-full">
        <TopNav />
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    </Layout>
  );
};

export default Home;
