import { getSession } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export const getServerSideProps = async ({
  req,
  res,
}: {
  req: any;
  res: any;
}) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

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
