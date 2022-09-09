import { objectType, extendType } from 'nexus';

export const Track = objectType({
  name: 'Track',
  definition(t) {
    t.string('id');
    // createdAts
    // udpatedAt
    t.string('name');
  },
});
