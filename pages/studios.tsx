import Layout from '../components/Layout';
import StudiosCarousel from '../components/studios/StudiosCarousel';

const studios = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col items-center text-center w-full pt-10">
          <h2>Meet the Underground Universal Community</h2>
          <StudiosCarousel />
        </div>
      </div>
    </Layout>
  );
};

export default studios;
