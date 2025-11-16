import Button from '../../core-components/button/Button';
import modalService from '../../core-components/modal/modalService';
import { useGetSalonUsersQuery } from '../../store/salons.api';
import CreateSalonUserModal from '../createSalonUserModal/CreateSalonUserModal';
import DeleteSalonUserButton from './DeleteSalonUserButton';

interface Props {
  salonId: number;
}

export default function SalonUserList(props: Props): React.JSX.Element {
  const { salonId } = props;
  const { data: users = [] } = useGetSalonUsersQuery(Number(salonId));

  const openCreateUserModal = () => {
    modalService.openAsyncModal(CreateSalonUserModal, {
      salonId,
    });
  };

  return (
    <div>
      <Button onClick={openCreateUserModal}>Create user</Button>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Employed At</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.full_name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">
                {new Date(user.assigned_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </td>
              <td className="border border-gray-300 p-2">
                <DeleteSalonUserButton salonId={salonId} userId={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
