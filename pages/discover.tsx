import Layout from '../components/Layout';
import DiscoverCarousel from '../components/discover/DiscoverCarousel';

const discover = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          {/* <div className="py-5">Artists | Releases</div> */}
          <h2 className="pb-5 w-full">Meet the Community</h2>
          <DiscoverCarousel />
        </div>
      </div>
    </Layout>
  );
};

export default discover;
