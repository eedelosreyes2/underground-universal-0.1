import { gql, useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import Carousel from '../components/navigation/Carousel';
import SearchBar from '../components/search/SearchBar';

const AllArtistsQuery = gql`
  query {
    artists {
      id
      email
      name
      createdAt
      location
      status
      role
      level
      genres
      trackId
      trackSig {
        id
        name
      }
    }
  }
`;

const discover = () => {
  const { data, loading, error } = useQuery(AllArtistsQuery);

  console.log(data);

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col items-center text-center w-full">
          <div className="py-5">Artists | Releases</div>
          <h2>Meet the Underground Universal Community</h2>
          <SearchBar />
          {loading ? <p>Loading</p> : <Carousel />}
          {error && <p>Oh no... {error.message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default discover;
