import { objectType, extendType } from 'nexus';

export const Badge = objectType({
  name: 'Badge',
  definition(t) {
    t.string('id');
    // createdAts
    // udpatedAt
    t.string('name');
  },
});
