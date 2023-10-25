import Layout from "../components/Layout";
import DiscoverCarousel from "../components/discover/DiscoverCarousel";
import prisma from "../lib/prisma";

// TODO: Fetch serverSide props of artists (see [username].tsx)
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany();

  if (artists == null) return { notFound: true };

  for (var i in artists) {
    const { createdAt, udpatedAt } = artists[i];
    if (createdAt) {
      artists[i].createdAt = JSON.parse(JSON.stringify(createdAt));
    }
    if (udpatedAt) {
      artists[i].udpatedAt = JSON.parse(JSON.stringify(udpatedAt));
    }
  }

  return {
    props: { artists },
  };
};

const discover = ({ artists }: any) => {
  return (
    <Layout>
      <div className="page-container">
        {/* <div className="py-5">Artists | Releases</div> */}
        <h2 className="pb-5 w-full">Meet the Community</h2>
        <DiscoverCarousel artists={artists} />
      </div>
    </Layout>
  );
};

export default discover;
