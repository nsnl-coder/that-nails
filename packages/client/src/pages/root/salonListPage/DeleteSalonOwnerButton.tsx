import { useDeleteSalonOwnerMutation } from '../../../store/salons.api';
import Button from '../../../core-components/button/Button';

interface Props {
  salonId: number;
  userId: number;
}

export default function DeleteSalonOwnerButton(
  props: Props,
): React.JSX.Element {
  const { salonId, userId } = props;
  const [deleteSalonOwner, { isLoading }] = useDeleteSalonOwnerMutation();

  const handleDelete = () => {
    deleteSalonOwner({
      salonId,
      userId,
    });
  };

  return (
    <Button type='button' onClick={handleDelete} disabled={isLoading}>
      Delete
    </Button>
  );
}
