import { useMemo } from 'react';
import Input from '../../core-components/input/Input';
import { useGetServicesQuery } from '../../store/services.api';

interface Props {
  fieldName: string;
  salonId: number;
}

export default function ServiceSelect(props: Props): React.JSX.Element {
  const { fieldName, salonId } = props;
  const { data: services = [] } = useGetServicesQuery(salonId);

  const groupedServices = useMemo(() => {
    const groupedServices: {
      label: string;
      options: { label: string; value: number }[];
    }[] = [];

    services.forEach((service) => {
      const category = groupedServices.find(
        (group) => group.label === service.category_name,
      );

      if (category) {
        category.options.push({
          label: service.name,
          value: service.id,
        });
      } else {
        groupedServices.push({
          label: service.category_name,
          options: [
            {
              label: service.name,
              value: service.id,
            },
          ],
        });
      }
    });

    return groupedServices;
  }, [services]);

  return (
    <Input.Select fieldName={fieldName} options={groupedServices} isMulti />
  );
}
