const Genre = ({ genre }: any) => {
  const getLabel = (genre: string) => {
    switch (genre) {
      case 'HIPHOP':
        return 'Hip-hop';
      case 'ALTERNATIVE':
        return 'Alternative';
      case 'BOOMBAP':
        return 'Boom bap';
      case 'EASTCOAST':
        return 'East Coast';
      case 'HARDCORE':
        return 'Hardcore';
      case 'LOFI':
        return 'Lofi';
      case 'OLDSCHOOL':
        return 'Old School';
      case 'POP':
        return 'Pop';
      case 'RNB':
        return 'R&B';
      case 'SOUTHERN':
        return 'Southern';
      case 'TRAP':
        return 'Trap';
      case 'UNDERGROUND':
        return 'Underground';
      case 'MIDWEST':
        return 'Midwest';
      case 'WESTCOAST':
        return 'West Coast';
      case 'INSTRUMENTAL':
        return 'Instrumental';
    }
  };

  return <div className="tag">{getLabel(genre)?.toUpperCase()}</div>;
};

export default Genre;
