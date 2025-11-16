import type { JsonSelectable, SalonTable } from '@thatnails/shared';
import { useGetSalonOwnersQuery } from '../../../store/salons.api';
import DeleteSalonOwnerButton from './DeleteSalonOwnerButton';

interface Props {
  salon: JsonSelectable<SalonTable>;
}

export default function SalonOwnerList(props: Props): React.JSX.Element {
  const { salon } = props;
  const { data: owners = [] } = useGetSalonOwnersQuery(salon.id);

  return (
    <div>
      <table className='w-full table-auto border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>Email</th>
            <th className='border border-gray-300 p-2'>Phone</th>
            <th className='border border-gray-300 p-2'>Assigned At</th>
            <th className='border border-gray-300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.id}>
              <td className='border border-gray-300 p-2'>{owner.full_name}</td>
              <td className='border border-gray-300 p-2'>{owner.email}</td>
              <td className='border border-gray-300 p-2'>{owner.phone}</td>
              <td className='border border-gray-300 p-2'>
                {new Date(owner.assigned_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </td>
              <td className='border border-gray-300 p-2'>
                <DeleteSalonOwnerButton salonId={salon.id} userId={owner.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
