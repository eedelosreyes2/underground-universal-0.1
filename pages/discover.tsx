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
  const artists = data?.artists;

  return (
    <Layout>
      <div className="page-container">
        <div className="page-inner-container">
          {/* <div className="py-5">Artists | Releases</div> */}
          <h2 className="text-center">
            Meet the Underground Universal Community
          </h2>
          <SearchBar label="Artist name, location, genre" />
          {loading ? <p>Loading</p> : <Carousel artists={artists} />}
          {error && <p>Oh no... {error.message}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default discover;
