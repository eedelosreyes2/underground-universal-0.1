import { objectType, extendType, nonNull, stringArg, list, arg } from 'nexus';
import { Status, Role, Experience, Genre } from './Enums';
import { Album } from './Album';
import { Badge } from './Badge';
import { Track } from './Track';
import { Studio } from './Studio';

export const Artist = objectType({
  name: 'Artist',
  definition(t) {
    t.id('id');
    t.string('createdAt');
    t.string('udpatedAt');
    t.string('email');
    t.string('dob');
    t.string('name');
    t.string('username');
    t.string('location');
    t.string('badgeId');
    t.string('trackId');
    t.list.field('roles', { type: Role });
    t.field('experience', { type: Experience });
    t.list.field('genres', { type: Genre });
    t.string('bio');
    t.string('imgSrc');
    t.list.string('streamings');
    t.list.string('collabsSent');
    t.list.string('collabsRecieved');
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

export const ArtistByEmailQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getArtistByEmail', {
      type: 'Artist',
      args: { email: nonNull(stringArg()) },
      resolve(_parent, _args, ctx) {
        return ctx.prisma.artist.findUnique({
          where: {
            email: _args.email,
          },
        });
      },
    });
  },
});

export const ArtistByUsernameQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('getArtistByUsername', {
      type: 'Artist',
      args: { username: nonNull(stringArg()) },
      resolve(_parent, _args, ctx) {
        return ctx.prisma.artist.findUnique({
          where: {
            username: _args.username,
          },
        });
      },
    });
  },
});

export const UpdateArtist = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateArtist', {
      type: Artist,
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        username: stringArg(),
        location: stringArg(),
        bio: stringArg(),
        experience: stringArg(),
        roles: list(stringArg()),
        genres: list(stringArg()),
        streamings: list(stringArg()),
        imgSrc: stringArg(),
        trackSig: stringArg(), // TODO: Object args
      },
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist.update({
          where: {
            id: _args.id,
          },
          data: {
            name: _args.name,
            username: _args.username,
            location: _args.location,
            bio: _args.bio,
            imgSrc: _args.imgSrc,
            trackSig: _args.trackSig,
            badge: _args.badge,
            roles: _args.roles,
            genres: _args.genres,
            experience: _args.experience,
            streamings: _args.streamings,
          },
        });
      },
    });
  },
});

export const AddCollab = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addCollab', {
      type: Artist,
      args: { id: nonNull(stringArg()), collabsSent: list(stringArg()) },
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist.update({
          where: {
            id: _args.id,
          },
          data: {
            collabsSent: _args.collabsSent,
          },
        });
      },
    });
  },
});
