import { useFormContext } from 'react-hook-form';
import ReactSelect, {
  type GroupBase,
  type OptionsOrGroups,
} from 'react-select';
import cn from '../../../utils/cn.util';

type Option = { label: string; value: number };
type Group = GroupBase<Option>;

interface Props {
  fieldName: string;
  className?: string;
  options: OptionsOrGroups<Option, Group>;
  isMulti?: boolean;
}

export default function Select(props: Props): React.JSX.Element {
  const { fieldName, className, options, isMulti } = props;
  const { watch, setValue } = useFormContext();
  const value = watch(fieldName);

  return (
    <ReactSelect
      value={value}
      onChange={(value) => setValue(fieldName, value)}
      className={cn(className)}
      options={options}
      isMulti={isMulti}
    />
  );
}
