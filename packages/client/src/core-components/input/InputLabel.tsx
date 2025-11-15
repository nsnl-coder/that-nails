import type { LabelHTMLAttributes } from 'react';
import cn from '../../utils/cn.util';

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {}

export default function InputLabel(props: Props): React.JSX.Element {
  const { className, ...rest } = props;
  return (
    <label
      className={cn('text-sm font-medium text-gray-500 ', className)}
      {...rest}
    >
      {props.children}
    </label>
  );
}
