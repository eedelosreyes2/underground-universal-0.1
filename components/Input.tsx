interface Props {
  name: string;
  length: number;
  value: string;
  setValue: any;
}

const Input = ({ name, length, value, setValue }: Props) => {
  return (
    <div className="flex flex-col w-full max-w-sm">
      <div className="input-name flex flex-col">
        <input
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={length}
          className="outline-none text border-b border-secondary pb-1 mb-1 
            bg-fill-light dark:bg-fill-dark"
        />
        <div className="w-full flex justify-between">
          <label htmlFor={name}>{name}</label>
          {value.length > 0 && (
            <div className={value.length >= length ? 'text-primary' : ''}>
              {value.length + '/' + length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
