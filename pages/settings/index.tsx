import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const settings = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          <div
            onClick={() => router.push('/api/auth/logout')}
            className="text-button"
          >
            Logout
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default settings;
