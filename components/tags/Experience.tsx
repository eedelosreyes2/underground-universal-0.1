const Experience = ({ experience }: any) => {
  const getLabel = (experience: string) => {
    switch (experience) {
      case 'ROOKIE':
        return '<1 yr';
      case 'PLAYER':
        return '1-4 yrs';
      case 'PRO':
        return '5-9 yrs';
      case 'VETERAN':
        return '10+ yrs';
    }
  };

  const getColor = (experience: string) => {
    switch (experience) {
      case 'ROOKIE':
        return 'border-rookie';
      case 'PLAYER':
        return 'border-player';
      case 'PRO':
        return 'border-pro';
      case 'VETERAN':
        return 'border-veteran';
    }
  };

  return (
    <div
      className={'border rounded-full px-3 mr-2 mb-2 ' + getColor(experience)}
    >
      {getLabel(experience)}
    </div>
  );
};

export default Experience;
