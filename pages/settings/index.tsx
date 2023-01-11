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
        destination: '/',
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
        <h2 className="pb-5 w-full">Settings</h2>
        <Settings />
      </div>
    </Layout>
  );
};

export default settings;
