import Button from '../../../core-components/button/Button';
import modalService from '../../../core-components/modal/modalService';
import { useGetCategoriesQuery } from '../../../store/categories.api';
import { Link, Outlet, useParams } from 'react-router';
import CreateCategoryModal from './CreateCategoryModal';

export default function CategoryServicePageLayout(): React.JSX.Element {
  const salonId = useParams().salonId;
  const { data: categories = [] } = useGetCategoriesQuery(Number(salonId));

  const openCreateCategoryModal = () => {
    modalService.openAsyncModal(CreateCategoryModal, {
      salonId: Number(salonId),
    });
  };

  return (
    <div className='flex gap-x-4'>
      <div>
        <Button onClick={openCreateCategoryModal}>Create Category</Button>
        <Link to={`/owner/salons/${salonId}/categories`}>All Categories</Link>
        {categories.map((category) => (
          <div key={category.id}>
            <Link to={`/owner/salons/${salonId}/categories/${category.id}`}>
              {category.name}
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
