import Button from '../../core-components/button/Button';
import Input from '../../core-components/input/Input';

export default function CheckinNameInput(): React.JSX.Element {
  return (
    <div>
      <Input.Text fieldName="full_name" />
      <Button>Continue</Button>
    </div>
  );
}
