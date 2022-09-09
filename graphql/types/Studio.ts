import { objectType, extendType } from 'nexus';

export const Studio = objectType({
  name: 'Studio',
  definition(t) {
    t.string('id');
    // createdAts
    // udpatedAt
    t.string('name');
  },
});
