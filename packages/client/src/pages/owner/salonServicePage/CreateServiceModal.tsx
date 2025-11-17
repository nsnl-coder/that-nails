import type z from 'zod';
import { validationSchema } from '../../../../../shared/dist/esm/validations/index.validation';
import Button from '../../../core-components/button/Button';
import Form from '../../../core-components/form/Form';
import Heading from '../../../core-components/heading/Heading';
import Input from '../../../core-components/input/Input';
import Backdrop from '../../../core-components/modal/Backdrop';
import type { IBaseModal } from '../../../core-components/modal/ModalContainer';
import ModalTransition from '../../../core-components/modal/ModalTransition';
import { useCreateServiceMutation } from '../../../store/services.api';
import modalService from '../../../core-components/modal/modalService';

interface Props extends IBaseModal {
  categoryId: number;
  salonId: number;
}

export default function CreateServiceModal(props: Props): React.JSX.Element {
  const { categoryId, isOpen, salonId } = props;
  const [createService] = useCreateServiceMutation();

  const handleSubmit = (
    data: z.infer<typeof validationSchema.services.createService>,
  ) => {
    createService({
      ...data,
      category_id: categoryId,
      salonId,
    });
    modalService.closeModal(props.id);
  };

  return (
    <ModalTransition isOpen={isOpen}>
      <Form
        validationSchema={validationSchema.services.createService}
        className='bg-white w-96 shrink-0 z-20 p-6 space-y-4'
        defaultValues={{ category_id: categoryId }}
        onSubmit={handleSubmit}
      >
        <Heading.H1>Create Service</Heading.H1>
        <Input.Group>
          <Input.Container>
            <Input.Text fieldName='name' placeholder='Service Name' />
            <Input.Error fieldName='name' />
          </Input.Container>
          <Input.Container>
            <Input.Text fieldName='price' placeholder='Service Price' />
            <Input.Error fieldName='price' />
          </Input.Container>
          <Input.Container>
            <Input.Text fieldName='duration' placeholder='Service Duration' />
            <Input.Error fieldName='duration' />
          </Input.Container>
        </Input.Group>
        <Button type='submit'>Create Service</Button>
      </Form>
      <Backdrop />
    </ModalTransition>
  );
}
