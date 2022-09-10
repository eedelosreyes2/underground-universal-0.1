import { gql, useQuery } from '@apollo/client';
import Layout from '../components/Layout';

const AllArtistsQuery = gql`
  query {
    rtists {
      id
      email
      name
      createdAt
    }
  }
`;

const discover = () => {
  const { data, loading, error } = useQuery(AllArtistsQuery);
  console.log('yo');

  return (
    <Layout>
      <div>
        {/* <h1 className="text-3xl font-bold underline">Discover</h1> */}
        {/* <div>container</div> */}
        {loading ? <p>Loading</p> : ''}
        {error ? <p>Oh no... {error.message}</p> : ''}
      </div>
    </Layout>
  );
};

export default discover;
