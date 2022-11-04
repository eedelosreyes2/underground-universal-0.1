import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import Artist from '../components/artist/Artist';

export const getServerSideProps = async ({ params }: any) => {
  const username = params.username;
  const artist = await prisma.artist.findUnique({
    where: { username },
  });

  if (artist == null) return { notFound: true };

  const { createdAt, udpatedAt } = artist!;
  if (createdAt) {
    artist!.createdAt = JSON.parse(JSON.stringify(createdAt));
  }
  if (udpatedAt) {
    artist!.udpatedAt = JSON.parse(JSON.stringify(udpatedAt));
  }

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
