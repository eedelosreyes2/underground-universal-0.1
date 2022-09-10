export const resolvers = {
  Query: {
    artists: (
      _parent: any,
      _args: any,
      ctx: { prisma: { artist: { findMany: () => any } } }
    ) => {
      return ctx.prisma.artist.findMany();
    },
    albums: (
      _parent: any,
      _args: any,
      ctx: { prisma: { album: { findMany: () => any } } }
    ) => {
      return ctx.prisma.album.findMany();
    },
  },
};
