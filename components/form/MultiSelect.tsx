import { Multiselect as MultiselectReact } from 'multiselect-react-dropdown';
import { Controller } from 'react-hook-form';

interface Props {
  control: any;
  register: any;
  errors: any;
  required: boolean;
  name: string;
  placeholder: string;
  currentLength: number;
  maxLength: number;
  options: any;
  setValue: any;
}

// TODO: Save value of artist roles
// TODO: CSS darkmode
// TODO: Close on select (closeOnSelect)
// TODO: Required
const MultiSelect = ({
  control,
  register,
  errors,
  required,
  name,
  placeholder,
  currentLength,
  maxLength,
  options,
  setValue,
}: Props) => {
  // TODO: Fix errors after submit
  // console.log(errors[name]);
  return (
    <Controller
      name={name}
      control={control}
      {...register(name, { required: required && 'Required' })}
      render={({ field: { ...field } }) => {
        return (
          <div className="py-5">
            <MultiselectReact
              {...field}
              displayValue="name"
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
