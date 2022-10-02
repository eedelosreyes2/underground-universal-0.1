import { Multiselect as MultiselectReact } from 'multiselect-react-dropdown';
import { Controller } from 'react-hook-form';

interface Props {
  control: any;
  required: boolean;
  placeholder: string;
  maxLength: number;
  options: any;
}

// TODO: Save value of artist roles
// TODO: CSS darkmode
// TODO: Close on select (closeOnSelect)
// TODO: Required
const MultiSelect = ({
  control,
  required,
  placeholder,
  maxLength,
  options,
}: Props) => {
  return (
    <Controller
      name="multiSelectField"
      control={control}
      rules={{ required: required }}
      render={({ field: { ...field } }) => {
        console.log(field);
        return (
          <div className="py-5">
            <MultiselectReact
              {...field}
              displayValue="name"
              onSelect={(selected, item) => {
                console.log('selectfield', selected);
              }}
              onRemove={(selected, item) => {
                console.log('selectfield', selected);
              }}
              selectionLimit={maxLength}
              options={options}
              emptyRecordMsg=""
              placeholder={placeholder}
              hidePlaceholder
              avoidHighlightFirstOption
            />
            <div className=" min-h-[20px] flex justify-between">
              <p className="input-error">{'Required'}</p>
              <p
                className={'input-error '}
                //   (currentLength > maxLength ? 'text-primary' : 'text-gray')
                // }
              >
                {/* {currentLength}/{maxLength} */}
              </p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default MultiSelect;
