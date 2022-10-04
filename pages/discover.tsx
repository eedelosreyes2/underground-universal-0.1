import { gql, useQuery } from '@apollo/client';
import Layout from '../components/Layout';
import Carousel from '../components/discover/ArtistCarousel';
import SearchBar from '../components/SearchBar';

const GET_ALL_ARTISTS = gql`
  query {
    artists {
      id
      email
      name
      username
      location
      bio
      roles
      genres
      experience
      streamings
    }
  }
`;

const discover = () => {
  const { data, loading, error } = useQuery(GET_ALL_ARTISTS);

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
