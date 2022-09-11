import { enumType } from 'nexus';

export const Status = enumType({
  name: 'Status',
  members: ['GUEST', 'MEMBER', 'BADGED'],
  description: 'Status of Artist account',
});

export const Role = enumType({
  name: 'Role',
  members: ['RAPPER', 'SINGER', 'PRODUCER', 'DJ'],
  description: 'Role of Artist',
});

export const Level = enumType({
  name: 'Level',
  members: ['ROOKIE', 'PLAYER', 'PRO', 'VETERAN'],
  description: 'Level of Artist',
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
