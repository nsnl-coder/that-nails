import { Link, useParams } from 'react-router';
import { useGetCategoriesQuery } from '../../store/categories.api';
import ServiceListPage from './ServiceListPage';

export default function CategoryListPage(): React.JSX.Element {
  const { data: categories = [] } = useGetCategoriesQuery(undefined);
  const serviceId = useParams().id;

  return (
    <div className='flex gap-4'>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <h1>{category.name}</h1>
            <Link to={`/categories/${category.id}`}>View</Link>
          </div>
        ))}
      </div>
      {serviceId && <ServiceListPage categoryId={Number(serviceId)} />}
    </div>
  );
}
