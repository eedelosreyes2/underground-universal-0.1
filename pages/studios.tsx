import Layout from '../components/Layout';
import StudiosCarousel from '../components/studios/StudiosCarousel';

const studios = () => {
  return (
    <Layout>
      <div className="page-container">
        <StudiosCarousel />
      </div>
    </Layout>
  );
};

export default studios;
