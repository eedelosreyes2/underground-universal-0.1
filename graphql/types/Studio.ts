import { objectType, extendType } from 'nexus';

export const Studio = objectType({
  name: 'Studio',
  definition(t) {
    t.string('id');
    t.string('url');
    t.string('email');
    t.string('name');
    t.string('location');
    t.string('bio');
    t.string('hours');
    t.string('rates');
    t.boolean('hasEngineer');
    t.boolean('hasMixing');
    t.boolean('hasVideo');
    t.list.string('albums');
    t.list.string('tracks');
    t.list.string('artists');
  },
});

export const StudiosQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('studios', {
      type: Studio,
      resolve(_parent, _args, ctx) {
        return ctx.prisma.studio.findMany();
      },
    });
  },
});
