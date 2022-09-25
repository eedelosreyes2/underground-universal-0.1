import { objectType, extendType, intArg, queryType } from 'nexus';
import { Status, Role, Level, Genre } from './Enums';
import { Album } from './Album';
import { Badge } from './Badge';
import { Track } from './Track';
import { Studio } from './Studio';

export const Artist = objectType({
  name: 'Artist',
  definition(t) {
    t.string('id');
    t.string('createdAt');
    t.string('udpatedAt');
    t.string('email');
    t.string('dob');
    t.string('name');
    t.string('handle');
    t.string('location');
    t.string('badgeId');
    t.string('trackId');
    t.field('role', { type: Role });
    t.field('level', { type: Level });
    t.list.field('genres', { type: Genre });
    t.string('bio');
    t.string('imgSrc');
    t.list.string('streamings');
    t.field('status', { type: Status });
    t.field('trackSig', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .trackSig();
      },
    });
    t.list.field('albums', {
      type: Album,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .albums();
      },
    });
    t.field('badge', {
      type: Badge,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .badge();
      },
    });
    t.list.field('tracks', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .tracks();
      },
    });
    t.list.field('studios', {
      type: Studio,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .studios();
      },
    });
    t.list.field('features', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .features();
      },
    });
    t.list.field('sharedAlbums', {
      type: Album,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedAlbums();
      },
    });
    t.list.field('sharedAlbumsWith', {
      type: Album,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedAlbumsWith();
      },
    });
    t.list.field('sharedTracks', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedTracks();
      },
    });
    t.list.field('sharedTracksWith', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedTracksWith();
      },
    });
    t.list.field('Artist_B', { type: Artist });
    t.list.field('Artist_A', { type: Artist });
  },
});

export const ArtistsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('artists', {
      type: Artist,
      resolve(_parent, _args, ctx) {
        return ctx.prisma.artist.findMany();
      },
    });
  },
});
