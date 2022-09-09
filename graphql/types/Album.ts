import { objectType, extendType } from 'nexus';

export const Album = objectType({
  name: 'Album',
  definition(t) {
    t.string('id');
    // createdAts
    // udpatedAt
    t.string('name');
  },
});
