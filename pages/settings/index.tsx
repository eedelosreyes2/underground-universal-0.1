import { getSession } from '@auth0/nextjs-auth0';
import Layout from '../../components/Layout';
import Settings from '../../components/settings/Settings';

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
  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          <Settings />
        </div>
      </div>
    </Layout>
  );
};

export default settings;
