import { IconContext } from 'react-icons';
import { IoSearchSharp } from 'react-icons/io5';

interface Props {
  label: String;
}

const SearchBar = ({ label }: Props) => {
  return (
    <div className="w-full sm:max-w-sm my-10">
      <div className="w-full flex items-center border-b border-h3 text-h3 text-left pb-3">
        <IconContext.Provider
          value={{ size: '1.15em', className: 'mt-1 mr-2' }}
        >
          <IoSearchSharp />
        </IconContext.Provider>
        {label}
      </div>
    </div>
  );
};

export default SearchBar;
