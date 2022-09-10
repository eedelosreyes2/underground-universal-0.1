import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.artist.createMany({
    data: [
      {
        email: `oh@gmail.com`,
        name: 'Joe Mama',
        location: 'San Francisco, CA',
      },
      {
        email: `what@gmail.com`,
        name: 'Suzy Llama',
        location: 'Los Angeles, CA',
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
