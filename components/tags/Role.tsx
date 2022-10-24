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

  return (
    <div className="border border-primary rounded-full px-3 mr-2 mb-2">
      {getLabel(role)}
    </div>
  );
};

export default Role;
