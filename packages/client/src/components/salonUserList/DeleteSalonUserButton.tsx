import Button from '../../core-components/button/Button';
import { useDeleteSalonUserMutation } from '../../store/salons.api';

interface Props {
  salonId: number;
  userId: number;
}

export default function DeleteSalonOwnerButton(
  props: Props,
): React.JSX.Element {
  const { salonId, userId } = props;
  const [deleteSalonUser, { isLoading }] = useDeleteSalonUserMutation();

  const handleDelete = () => {
    deleteSalonUser({
      salonId,
      userId,
    });
  };

  return (
    <Button type="button" onClick={handleDelete} disabled={isLoading}>
      Delete
    </Button>
  );
}
