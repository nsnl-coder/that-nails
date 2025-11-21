import { useFieldArray, useFormContext } from 'react-hook-form';
import StyledInput from '../../../../components/styledInput/styledInput';
import TechnicianSelect from '../../../../components/styledInput/TechnicianSelect';
import Button from '../../../../core-components/button/Button';
import Heading from '../../../../core-components/heading/Heading';
import Input from '../../../../core-components/input/Input';

interface Props {
  salonId: number;
}

export default function Step1(props: Props): React.JSX.Element {
  const { salonId } = props;
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guests',
  });

  const isSingleGuest = fields.length === 1;

  return (
    <div className="space-y-8">
      {fields.map((field, index) => (
        <Input.Container key={field.id}>
          {!isSingleGuest && (
            <div className="flex items-center justify-between">
              <Heading.H3>Guest {index + 1}</Heading.H3>
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          )}
          <Input.Container>
            <Input.Label>Services</Input.Label>
            <StyledInput.ServiceSelect
              fieldName={`guests.${index}.services`}
              salonId={salonId}
            />
          </Input.Container>
          <Input.Container>
            <Input.Label>Technician</Input.Label>
            <TechnicianSelect
              fieldName={`guests.${index}.technician_id`}
              salonId={salonId}
            />
          </Input.Container>
        </Input.Container>
      ))}
      <Input.Container>
        <Input.Label> Date</Input.Label>
        <Input.Date fieldName={`appointment_date`} />
      </Input.Container>
      <Button
        onClick={() => append({ name: '', technician_id: 0, services: [] })}
        className="w-full "
      >
        Add Guest
      </Button>
    </div>
  );
}
