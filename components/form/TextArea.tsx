import { useEffect } from 'react';

interface Props {
  register: any;
  errors: any;
  name: string;
  initialValue?: string;
  palceholder: string;
  currentLength: number;
  minLength: number;
  maxLength: number;
  setValue: any;
}

// TODO: Fix Input starts where placeholder does
const TextArea = ({
  register,
  errors,
  name,
  initialValue,
  palceholder,
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
      <textarea
        {...register(name, {
          required: false,
          minLength: {
            value: minLength,
            message: name + ' must be at least ' + minLength + ' characters',
          },
          maxLength,
        })}
        initialValue={initialValue}
        placeholder={palceholder}
        className={
          'pb-2 resize-none input ' +
          (errors[name] ? 'border-primary' : 'border-gray')
        }
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

export default TextArea;
