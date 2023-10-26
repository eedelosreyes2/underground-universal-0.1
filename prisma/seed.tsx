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
        imgSrc:
          "https://media.canva.com/1/image-resize/1/1600_1600_92_JPG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS9MZWVKRS9NQUZ5VTJMZWVKRS8xL3AuanBn?osig=AAAAAAAAAAAAAAAAAAAAAGKCegNnEOuefd4eYOtmj3vlDgFMgwHLfyMlLEU3euE-&exp=1698308422&x-canva-quality=screen_2x&csig=AAAAAAAAAAAAAAAAAAAAAMtx4RwgrT9A3tfEfVxQQHIJIlqO6Gqd8-l8eU4F29pg",
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
        imgSrc:
          "https://media.canva.com/1/image-resize/1/1600_1600_92_JPG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS95Z0c5US9NQUZ5VTR5Z0c5US8xL3AuanBn?osig=AAAAAAAAAAAAAAAAAAAAAKuhDln-7hF7wbn0rBlT_UT5wgVC2H8OCrsJfwKIDv_X&exp=1698307627&x-canva-quality=screen_2x&csig=AAAAAAAAAAAAAAAAAAAAAHdz3yxQcTHT3c9XkBvKXqFWeM51Lg_z80qt9mrnr2Gl",
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
        imgSrc:
          "https://media.canva.com/1/image-resize/1/1600_1600_92_JPG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS80YVJ5OC9NQUZ5VS00YVJ5OC8xL3AuanBn?osig=AAAAAAAAAAAAAAAAAAAAADV6CRyYKaIRS-zmL9ziGKaAg6vWnORyKIab0jA4jogn&exp=1698306194&x-canva-quality=screen_2x&csig=AAAAAAAAAAAAAAAAAAAAAKd_6kFerDk_UgI-E9FoRenl3_hUOcb2Ln_XxNipNpVc",
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
        imgSrc:
          "https://media.canva.com/1/image-resize/1/1600_1600_92_JPG_F/czM6Ly9tZWRpYS1wcml2YXRlLmNhbnZhLmNvbS9QcUZpUS9NQUZ5VV9QcUZpUS8xL3AuanBn?osig=AAAAAAAAAAAAAAAAAAAAAORWF9aZRzGLi5Q7ZxfyFnjaVnD1drxBpTVye3oIECJi&exp=1698306604&x-canva-quality=screen_2x&csig=AAAAAAAAAAAAAAAAAAAAAHKbbxVe6RwGrJGXvqlq_WKzkTI7ir4dHVCYcwEVtT4-",
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
