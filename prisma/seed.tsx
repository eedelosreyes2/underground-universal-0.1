import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.artist.createMany({
    data: [
      {
        email: `oh@gmail.com`,
        name: 'Joe Mama',
        location: 'San Francisco, CA',
        genres: ['HIPHOP'],
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        streamings: ['spotify.com', 'applemusic.com', 'youtube.com'],
        username: 'joe',
        roles: ['RAPPER'],
        experience: 'PLAYER',
      },
      {
        email: `what@gmail.com`,
        name: 'Suzy Llama',
        location: 'Los Angeles, CA',
        genres: ['HIPHOP'],
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        streamings: ['spotify.com', 'applemusic.com', 'youtube.com'],
        username: 'suzy',
        roles: ['PRODUCER'],
        experience: 'VETERAN',
      },
      {
        email: `cares@gmail.com`,
        name: 'Keegan',
        location: 'ATL',
        genres: ['MIDWEST'],
        bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        streamings: ['spotify.com', 'applemusic.com', 'youtube.com'],
        username: 'cares',
        roles: ['PRODUCER', 'RAPPER'],
        experience: 'PRO',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
