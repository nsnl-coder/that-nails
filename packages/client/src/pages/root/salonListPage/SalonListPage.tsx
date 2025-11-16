import type {
  JsonSelectable,
  SalonTable,
} from '../../../../../shared/dist/esm/types/db.type';
import Button from '../../../core-components/button/Button';
import modalService from '../../../core-components/modal/modalService';
import { useGetSalonsQuery } from '../../../store/salons.api';
import CreateSalonModal from '../CreateSalonModal';
import EditSalonModal from './UpdateSalonModal';

export default function SalonListPage(): React.JSX.Element {
  const { data: salons = [] } = useGetSalonsQuery(undefined);

  const openCreateSalonModal = () => {
    modalService.openAsyncModal(CreateSalonModal, {});
  };

  const openEditSalonModal = (salon: JsonSelectable<SalonTable>) => {
    modalService.openAsyncModal(EditSalonModal, { salon });
  };

  return (
    <div className="p-8 space-y-8">
      <Button onClick={openCreateSalonModal}>Create salon</Button>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-300 text-left">Name</th>
            <th className="p-2 border border-gray-300 text-left">Address</th>
            <th className="p-2 border border-gray-300 text-left">Phone</th>
            <th className="p-2 border border-gray-300 text-left">Email</th>
            <th className="p-2 border border-gray-300 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salons.map((salon) => (
            <tr key={salon.id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{salon.name}</td>
              <td className="border border-gray-300 p-2">{salon.address}</td>
              <td className="border border-gray-300 p-2">{salon.phone}</td>
              <td className="border border-gray-300 p-2">{salon.email}</td>
              <td className="border border-gray-300 p-2">
                <Button onClick={() => openEditSalonModal(salon)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
