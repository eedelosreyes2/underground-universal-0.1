const Role = ({ role }: any) => {
  const getLabel = (role: string) => {
    switch (role) {
      case 'RAPPER':
        return 'Rapper';
      case 'SINGER':
        return 'Singer';
      case 'PRODUCER':
        return 'Producer';
      case 'DJ':
        return 'DJ';
      case 'ENGINEER':
        return 'Engineer';
    }
  };

  return <div className="tag">{getLabel(role)?.toUpperCase()}</div>;
};

export default Role;
