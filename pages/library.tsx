import { getSession } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout';
import Library from '../components/library/Library';

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

const library = () => {
  return (
    <Layout>
      <div className="page-container">
        <h2 className="pb-5 w-full">Share Your Music</h2>
        <Library />
      </div>
    </Layout>
  );
};

export default library;
