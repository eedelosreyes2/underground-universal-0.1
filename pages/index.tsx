import type { NextPage } from 'next';

import Header from '../components/Header';
import Nav from '../components/Nav';

const Home: NextPage = () => {
  return (
    <html className="dark">
      <body>
        <main className="min-h-screen dark:bg-slate-900">
          <Header />
          <Nav />
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </main>
      </body>
    </html>
  );
};

export default Home;
