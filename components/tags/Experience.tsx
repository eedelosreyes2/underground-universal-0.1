const Experience = ({ experience }: any) => {
  const getLabel = (experience: string) => {
    switch (experience) {
      case 'ROOKIE': // <yr
        return '<1 yr';
      case 'PLAYER': // 1-4 yrs
        return '1-4 yrs';
      case 'PRO': // 5-9 yrs
        return '5-9 yrs';
      case 'VETERAN': // 10+ yrs
        return '10+ yrs';
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
