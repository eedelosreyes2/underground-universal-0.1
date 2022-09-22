import { gql, useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import Carousel from '../components/discover/ArtistCarousel';
import SearchBar from '../components/SearchBar';

const AllArtistsQuery = gql`
  query {
    artists {
      id
      email
    }
  }
`;

const discover = () => {
  const { data, loading, error } = useQuery(AllArtistsQuery);

  console.log(data);

  return (
    <Layout>
      <div className="page-container">
        <div className="flex flex-col items-center text-center w-full pt-10">
          {/* <div className="py-5">Artists | Releases</div> */}
          <h2>Meet the Underground Universal Community</h2>
          <SearchBar label="Artist name, location, genre" />
          {loading ? <p>Loading</p> : <Carousel />}
          {error && <p>Oh no... {error.message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default discover;
