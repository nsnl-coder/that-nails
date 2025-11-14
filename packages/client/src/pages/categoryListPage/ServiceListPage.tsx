import { useGetCategoryServicesQuery } from '../../store/categories.api';

interface Props {
  categoryId: number;
}

export default function ServiceListPage(props: Props): React.JSX.Element {
  const { categoryId } = props;
  const { data: services = [] } = useGetCategoryServicesQuery(categoryId);

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <p>{service.price}</p>
        </div>
      ))}
    </div>
  );
}
