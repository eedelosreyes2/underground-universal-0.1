import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoSearchSharp } from 'react-icons/io5';

interface Props {
  label: string;
}

const SearchBar = ({ label }: Props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div className="w-full sm:max-w-sm my-10">
      <div className="flex border-b border-secondary">
        <IconContext.Provider
          value={{ size: '1.15em', className: 'text-secondary mt-1 mr-2' }}
        >
          <IoSearchSharp />
        </IconContext.Provider>
        <input
          id={'name'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={60}
          placeholder={label}
          className="outline-none text w-full flex items-center text-h3 
            text-left pb-3 bg-fill-light dark:bg-fill-dark"
        />
      </div>
    </div>
  );
};

export default SearchBar;
