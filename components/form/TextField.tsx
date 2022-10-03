import { useEffect } from 'react';

interface Props {
  register: any;
  errors: any;
  name: string;
  initialValue?: string;
  palceholder: string;
  required: boolean;
  currentLength: number;
  minLength: number;
  maxLength: number;
  setValue: any;
}

const TextField = ({
  register,
  errors,
  name,
  initialValue,
  palceholder,
  required,
  currentLength,
  minLength,
  maxLength,
  setValue,
}: Props) => {
  useEffect(() => {
    setValue(name, initialValue);
  }, [initialValue]);

  return (
    <div className="py-5">
      <input
        {...register(name, {
          required: required && 'Required',
          minLength: {
            value: minLength,
            message: name + ' must be at least ' + minLength + ' characters',
          },
          maxLength,
        })}
        defaultValue={initialValue}
        placeholder={palceholder}
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
