import DateInput from './DateInput';
import InputContainer from './InputContainer';
import InputError from './InputError';
import InputGroup from './InputGroup';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import Select from './select/Select';

const Input = {
  Text: TextInput,
  Container: InputContainer,
  Label: InputLabel,
  Group: InputGroup,
  Error: InputError,
  Select: Select,
  Date: DateInput,
};

export default Input;
