import { getSession } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout';

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

const collabs = () => {
  return (
    <Layout>
      <div className="page-container">Collabs</div>
    </Layout>
  );
};

export default collabs;
