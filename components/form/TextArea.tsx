import { useEffect } from 'react';

interface Props {
  register: any;
  errors: any;
  name: string;
  initialvalue?: string;
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
  initialvalue,
  palceholder,
  currentLength,
  minLength,
  maxLength,
  setValue,
}: Props) => {
  useEffect(() => {
    setValue(name, initialvalue);
  }, [name, setValue, initialvalue]);

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
        initialvalue={initialvalue}
        placeholder={palceholder}
        className={
          'pb-2 resize-none no-scrollbar min-h-[200px] input ' +
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
