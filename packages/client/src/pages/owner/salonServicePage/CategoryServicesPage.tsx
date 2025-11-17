import { useParams } from 'react-router';
import { useGetCategoryServicesQuery } from '../../../store/categories.api';
import Button from '../../../core-components/button/Button';
import CreateServiceModal from './CreateServiceModal';
import modalService from '../../../core-components/modal/modalService';

export default function CategoryServicesPage(): React.JSX.Element {
  const categoryId = useParams().categoryId;
  const salonId = useParams().salonId;
  const categoryIdNumber = categoryId ? Number(categoryId) : -1;

  const { data: services = [] } = useGetCategoryServicesQuery({
    categoryId: categoryIdNumber,
    salonId: Number(salonId),
  });

  const openCreateServiceModal = () => {
    modalService.openAsyncModal(CreateServiceModal, {
      categoryId: categoryIdNumber,
      salonId: Number(salonId),
    });
  };

  return (
    <div>
      <Button onClick={openCreateServiceModal}>Create Service</Button>
      {services.map((service) => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <p>{service.price}</p>
          <p>{service.duration}</p>
        </div>
      ))}
    </div>
  );
}
