import { gql, useQuery } from '@apollo/client';
import Layout from '../components/Layout';

const AllArtistsQuery = gql`
  query {
    artists {
      id
      email
      name
      createdAt
    }
  }
`;

const discover = () => {
  const { data, loading, error } = useQuery(AllArtistsQuery);

  return (
    <Layout>
      <div>
        {loading && <p>Loading</p>}
        {error && <p>Oh no... {error.message}</p>}
      </div>
    </Layout>
  );
};

export default discover;
