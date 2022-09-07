import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Layout>
  );
};

export default Home;
