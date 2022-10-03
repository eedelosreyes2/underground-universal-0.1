const Experience = ({ experience }: any) => {
  const getLabel = (experience: string) => {
    switch (experience) {
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
        ('border-' + getLabel(experience)?.toLowerCase())
      }
    >
      {getLabel(experience)}
    </div>
  );
};

export default Experience;
