import { Multiselect as MultiselectReact } from 'multiselect-react-dropdown';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  control: any;
  register: any;
  errors: any;
  required: boolean;
  name: string;
  initialvalue?: string[];
  placeholder: string;
  currentLength: number;
  maxLength: number;
  options: any;
  setValue: any;
}

// TODO: Required
const MultiSelect = ({
  control,
  register,
  errors,
  required,
  name,
  initialvalue,
  placeholder,
  currentLength,
  maxLength,
  options,
  setValue,
}: Props) => {
  const selectedValues = options.filter((option: any) =>
    initialvalue?.includes(option.value)
  );

  useEffect(() => {
    if (
      (currentLength == null || currentLength <= 0) &&
      selectedValues.length
    ) {
      setValue(name, selectedValues);
    }
  }, [currentLength, name, selectedValues]);

  return (
    <Controller
      name={name}
      control={control}
      {...register(name, { required: required && 'Required' })}
      render={({ field: { ref, ...field } }) => {
        return (
          <div className="py-5">
            <MultiselectReact
              {...field}
              ref={ref}
              displayValue="name"
              selectedValues={selectedValues}
              onSelect={(selected, item) => {
                setValue(name, selected);
              }}
              onRemove={(selected, item) => {
                setValue(name, selected);
              }}
              selectionLimit={maxLength}
              options={options}
              emptyRecordMsg=""
              placeholder={placeholder}
              hidePlaceholder
              avoidHighlightFirstOption
              className={
                'input ' + (errors[name] ? 'border-primary' : 'border-gray')
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
                {currentLength || 0}/{maxLength}
              </p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default MultiSelect;
