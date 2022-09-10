import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const Home = () => {
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return <Layout />;
};

export default Home;
