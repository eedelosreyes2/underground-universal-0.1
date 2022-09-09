export const resolvers = {
  Query: {
    artists: (
      _parent: any,
      _args: any,
      ctx: { prisma: { artist: { findMany: () => any } } }
    ) => {
      return ctx.prisma.artist.findMany();
    },
  },
};
