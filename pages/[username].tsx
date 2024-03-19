import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import Artist from '../components/artist/Artist';
import artists from "../public/artists.json";

export const getServerSideProps = async ({ params }: any) => {
  const username = params.username;
  // const artist = await prisma.artist.findUnique({
  //   where: { username },
  // });
  const artist = artists.filter((artist) => artist.username === username);

  if (artist == null) return { notFound: true };

  // const { createdAt, updatedAt } = artist!;
  // if (createdAt) {
  //   artist!.createdAt = JSON.parse(JSON.stringify(createdAt));
  // }
  // if (updatedAt) {
  //   artist!.updatedAt = JSON.parse(JSON.stringify(updatedAt));
  // }

  return {
    props: { artist },
  };
};

const profile = ({ artist }: any) => {
  return (
    <Layout>
      <div className="page-container">
        <Artist artist={artist} />
      </div>
    </Layout>
  );
};

export default profile;
