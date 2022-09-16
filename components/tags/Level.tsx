const Level = ({ level }: any) => {
  const getLabel = (level: string) => {
    switch (level) {
      case 'ROOKIE': // <yr
        return 'Rookie';
      case 'PLAYER': // 1-4 yrs
        return 'Player';
      case 'PRO': // 5-9 yrs
        return 'Pro';
      case 'VETERAN': // 10+ yrs
        return 'Veteran';
    }
  };

  return (
    <div
      className={
        'border rounded-full px-3 mr-2 mb-2 ' +
        ('border-' + getLabel(level)?.toLowerCase())
      }
    >
      {getLabel(level)}
    </div>
  );
};

export default Level;
