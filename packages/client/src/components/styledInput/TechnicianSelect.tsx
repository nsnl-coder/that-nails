import { USER_ROLE } from '@thatnails/shared';
import Input from '../../core-components/input/Input';
import { useGetSalonUsersQuery } from '../../store/salons.api';

interface Props {
  fieldName: string;
  className?: string;
  salonId: number;
}

export default function TechnicianSelect(props: Props): React.JSX.Element {
  const { fieldName, salonId } = props;
  const { data: technicians = [] } = useGetSalonUsersQuery(salonId);

  const employees = technicians.filter(
    (user) => user.role === USER_ROLE.EMPLOYEE,
  );

  return (
    <Input.Select
      fieldName={fieldName}
      options={employees.map((employee) => ({
        label: employee.full_name,
        value: employee.id,
      }))}
    />
  );
}
