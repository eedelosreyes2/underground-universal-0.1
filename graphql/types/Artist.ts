import { objectType, extendType } from 'nexus';
import { Status, Role, Level, Genre } from './Enums';
import { Track } from './Track';

export const Artist = objectType({
  name: 'Artist',
  definition(t) {
    t.string('id');
    // t.string('createdAt');
    // t.string('udpatedAt');
    t.string('email');
    // t.string('dob');
    t.string('name');
    t.string('location');
    t.string('badgeId');
    t.string('trackId');
    t.field('role', { type: Role });
    t.field('level', { type: Level });
    // t.string('genres');
    t.string('bio');
    // t.string('streaming');
    // t.string('status');
    // t.string('trackSig');
    // t.string('albums');
    // t.string('badge');
    // t.string('tracks');
    // t.string('studios');
    // t.string('features');
    // t.string('sharedAlbum');
    // t.string('sharedAlbumWith');
    // t.string('sharedTrack');
    // t.string('sharedTrackWith');
    // t.string('Artist_B');
    // t.string('Artist_A');

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
  },
});
