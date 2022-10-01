import { Multiselect as MultiselectReact } from 'multiselect-react-dropdown';
import { Controller } from 'react-hook-form';

interface Props {
  control: any;
  placeholder: string;
  options: any;
}

// TODO: Save value of artist roles
// TODO: CSS darkmode
// TODO: Close on select (closeOnSelect)
// TODO: Required
const MultiSelect = ({ control, placeholder, options }: Props) => {
  return (
    <Controller
      name="multiSelectField"
      control={control}
      render={({ field: { ...field } }) => {
        console.log(field);
        return (
          <MultiselectReact
            {...field}
            displayValue="name"
            onSelect={(selected, item) => {
              console.log('selectfield', selected);
            }}
            onRemove={(selected, item) => {
              console.log('selectfield', selected);
            }}
            options={options}
            emptyRecordMsg=""
            placeholder={placeholder}
            hidePlaceholder
            avoidHighlightFirstOption
            className="py-5"
          />
        );
      }}
    />
  );
};

export default MultiSelect;
