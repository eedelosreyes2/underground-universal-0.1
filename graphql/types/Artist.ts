import { objectType } from 'nexus';
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
    t.string('location');
    t.string('badgeId');
    t.string('trackId');
    t.field('role', { type: Role });
    t.field('level', { type: Level });
    t.list.field('genres', { type: Genre });
    t.string('bio');
    t.list.string('streaming');
    t.field('status', { type: Status });
    t.field('trackSig', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.trackId,
            },
          })
          .albums();
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
    t.list.field('badges', {
      type: Badge,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.badgeId,
            },
          })
          .badges();
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
      type: Artist,
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
    t.list.field('sharedAlbum', {
      type: Album,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedAlbum();
      },
    });
    t.list.field('sharedAlbumWith', {
      type: Studio,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedAlbumWith();
      },
    });
    t.list.field('sharedTrack', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedTrack();
      },
    });
    t.list.field('sharedTrackWith', {
      type: Track,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .sharedTrackWith();
      },
    });
    t.list.field('collabed', {
      type: Artist,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .collabed();
      },
    });
    t.list.field('collabedWith', {
      type: Artist,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.artist
          .findUnique({
            where: {
              id: _parent.id!,
            },
          })
          .collabedWith();
      },
    });
  },
});
