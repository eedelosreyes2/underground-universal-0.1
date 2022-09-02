import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Header from '../components/Header';
const Nav = dynamic(() => import('../components/Nav'), { ssr: false });

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-fill-light dark:bg-fill-dark">
      <Header />
      <Nav />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Home;
