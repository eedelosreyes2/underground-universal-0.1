interface Props {
  register: any;
  errors: any;
  name: String;
  currentLength: number;
  minLength: number;
  maxLength: number;
}

const Input = ({
  register,
  errors,
  name,
  currentLength,
  minLength,
  maxLength,
}: Props) => {
  console.log(currentLength);

  return (
    <>
      <input
        {...register(name, {
          required: 'Required',
          minLength: {
            value: minLength,
            message: name + ' must be at least ' + minLength + ' characters',
          },
          maxLength,
        })}
        placeholder="Name"
        className={
          'input ' + (errors.Name ? 'border-primary' : 'border-secondary')
        }
      />
      <div className=" min-h-[20px] flex justify-between">
        <p className="input-error">{errors.Name?.message}</p>
        <p
          className={
            'input-error ' +
            (currentLength > maxLength ? 'text-primary' : 'text-secondary')
          }
        >
          {currentLength}/{maxLength}
        </p>
      </div>
    </>
  );
};

export default Input;
