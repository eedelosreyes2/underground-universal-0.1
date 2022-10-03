import { enumType } from 'nexus';

export const Status = enumType({
  name: 'Status',
  members: ['GUEST', 'MEMBER', 'BADGED'],
  description: 'Status of Artist account',
});

export const Role = enumType({
  name: 'Role',
  members: ['RAPPER', 'SINGER', 'PRODUCER', 'DJ'],
  description: 'Role(s) of Artist',
});

export const Experience = enumType({
  name: 'Experience',
  members: ['ROOKIE', 'PLAYER', 'PRO', 'VETERAN'],
  description: 'Experience of Artist',
});

export const Genre = enumType({
  name: 'Genre',
  members: [
    'HIPHOP',
    'ALTERNATIVE',
    'BOOMBAP',
    'EASTCOAST',
    'HARDCORE',
    'LOFI',
    'OLDSCHOOL',
    'POP',
    'RNB',
    'SOUTHERN',
    'TRAP',
    'UNDERGROUND',
    'MIDWEST',
    'WESTCOAST',
    'INSTRUMENTAL',
  ],
  description: 'Genres',
});
