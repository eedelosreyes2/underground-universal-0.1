import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.artist.createMany({
    data: [
      {
        email: `mccipher@gmail.com`,
        name: "MC Cipher",
        location: "Brooklyn, New York",
        genres: ["HIPHOP", "EASTCOAST"],
        bio: "I'm from Brooklyn, NY, where my profound verses and innovative beats break hip-hop boundaries, offering urban storytelling through my music.",
        streamings: ["spotify.com", "applemusic.com", "youtube.com"],
        username: "MCCipher",
        roles: ["RAPPER"],
        experience: "PLAYER",
      },
      {
        email: `lyricscribe@hiphopmail.com`,
        name: "Lyric Scribe",
        location: "Los Angeles, California",
        genres: ["HIPHOP", "POP", "TRAP"],
        bio: "My music delves into urban life and love with introspective storytelling, aiming to reshape hip-hop and inspire change with thought-provoking rhymes.",
        streamings: ["spotify.com", "applemusic.com", "youtube.com"],
        username: "LyricScribe",
        roles: ["PRODUCER"],
        experience: "VETERAN",
      },
      {
        email: `flowmasterbeats@gmail.com`,
        name: "DJ Flowmaster",
        location: "Atlanta, Georgia",
        genres: ["SOUTHERN", "OLDSCHOOL"],
        bio: "I craft fresh beats, mixing old-school charm with a modern edge, offering an unforgettable rhythmic journey in the underground hip-hop scene.",
        streamings: ["spotify.com", "applemusic.com", "youtube.com"],
        username: "DJFlowmaster",
        roles: ["PRODUCER", "RAPPER"],
        experience: "PRO",
      },
      {
        email: `ellarhyme@musicflow.com`,
        name: "Ella Rhyme",
        location: "Chicago, Illinois",
        genres: ["MIDWEST"],
        bio: "I'm Ella Rhyme, a Chicago native, making waves in underground hip-hop with powerful lyrics, storytelling, and a voice for the streets.",
        streamings: ["spotify.com", "applemusic.com", "youtube.com"],
        username: "EllaRhyme",
        roles: ["PRODUCER", "RAPPER"],
        experience: "ROOKIE",
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
