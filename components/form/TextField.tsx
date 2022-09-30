interface Props {
  register: any;
  errors: any;
  name: string;
  currentLength: number;
  minLength: number;
  maxLength: number;
}

const TextField = ({
  register,
  errors,
  name,
  currentLength,
  minLength,
  maxLength,
}: Props) => {
  return (
    <div className="py-5">
      <input
        {...register(name, {
          required: 'Required',
          minLength: {
            value: minLength,
            message: name + ' must be at least ' + minLength + ' characters',
          },
          maxLength,
        })}
        placeholder={name}
        className={'input ' + (errors[name] ? 'border-primary' : 'border-gray')}
      />
      <div className=" min-h-[20px] flex justify-between">
        <p className="input-error">{errors[name]?.message}</p>
        <p
          className={
            'input-error ' +
            (currentLength > maxLength ? 'text-primary' : 'text-gray')
          }
        >
          {currentLength}/{maxLength}
        </p>
      </div>
    </div>
  );
};

export default TextField;
