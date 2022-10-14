import Layout from '../components/Layout';
import StudiosCarousel from '../components/studios/StudiosCarousel';

const studios = () => {
  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          <StudiosCarousel />
        </div>
      </div>
    </Layout>
  );
};

export default studios;
