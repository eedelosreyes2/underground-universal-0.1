import { useQuery } from '@apollo/client';
import { getSession } from '@auth0/nextjs-auth0';
import { gql } from 'apollo-server-micro';
import Carousel from '../components/discover/StudioCarousel';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

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

const AllStudiosQuery = gql`
  query {
    studios {
      id
      email
    }
  }
`;

const studios = () => {
  const { data, loading, error } = useQuery(AllStudiosQuery);

  console.log(data);

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col items-center text-center w-full pt-10">
          <h2>Meet the Underground Universal Community</h2>
          <SearchBar label="Name or location" />
          {loading ? <p>Loading</p> : <Carousel />}
          {/* {error && <p>Oh no... {error.message}</p>} */}
        </div>
      </div>
    </Layout>
  );
};

export default studios;
