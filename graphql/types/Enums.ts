import { enumType } from 'nexus';

export const Status = enumType({
  name: 'Status',
  members: ['GUEST', 'MEMBER', 'BADGED'],
  description: 'Status of Artist account',
});

export const Role = enumType({
  name: 'Role',
  members: {
    RAPPER: 'Rapper',
    SINGER: 'Singer',
    PRODUCER: 'Producer',
    DJ: 'Dj',
  },
  description: 'Role of Artist',
});

export const Level = enumType({
  name: 'Level',
  members: {
    ROOKIE: { name: 'Rookie', description: '<1 yr' },
    PLAYER: { name: 'Player', description: '1-4 yrs' },
    PRO: { name: 'Pro', description: '5-9 yrs' },
    VETERAN: { name: 'Veteran', description: '10+ yrs' },
  },
  description: 'Level of Artist',
});

export const Genre = enumType({
  name: 'Genre',
  members: {
    HIPHOP: 'Hip hop',
    ALTERNATIVE: 'Alternative',
    BOOMBAP: 'Boom Bap',
    EASTCOAST: 'East Coast',
    HARDCORE: 'Hardcore',
    LOFI: 'Lofi',
    OLDSCHOOL: 'Old School',
    POP: 'Pop',
    RNB: 'R&B',
    SOUTHERN: 'Southern',
    TRAP: 'Trap',
    UNDERGROUND: 'Underground',
    MIDWEST: 'Midwest',
    WESTCOAST: 'Westcoast',
    INSTRUMENTAL: 'Instrumental',
  },
  description: 'Genres',
});
