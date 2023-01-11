import { getSession } from '@auth0/nextjs-auth0';
import Layout from '../../components/Layout';
import Profile from '../../components/settings/Profile';

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

const editProfile = () => {
  return (
    <Layout>
      <div className="page-container">
        <Profile />
      </div>
    </Layout>
  );
};

export default editProfile;
