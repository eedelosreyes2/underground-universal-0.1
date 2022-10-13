import { useQuery } from '@apollo/client';
import { getSession } from '@auth0/nextjs-auth0';
import { gql } from 'apollo-server-micro';
import Carousel from '../discover/StudioCarousel';
import SearchBar from '../SearchBar';

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

const StudiosCarousel = () => {
  const { data, loading, error } = useQuery(AllStudiosQuery);

  console.log(data);

  return (
    <div>
      <SearchBar label="Name or location" />
      {loading ? <p>Loading</p> : <Carousel />}
    </div>
  );
};

export default StudiosCarousel;
