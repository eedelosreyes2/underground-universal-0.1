import Layout from '../components/Layout';
import DiscoverCarousel from '../components/discover/discoverCarousel';

const discover = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          {/* <div className="py-5">Artists | Releases</div> */}
          <h2 className="text-center pb-10">
            Meet the Underground Universal Community
          </h2>
          <DiscoverCarousel />
        </div>
      </div>
    </Layout>
  );
};

export default discover;
