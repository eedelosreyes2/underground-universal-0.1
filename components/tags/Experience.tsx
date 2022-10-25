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

  return <div className="tag">{getLabel(experience)?.toUpperCase()}</div>;
};

export default Experience;
