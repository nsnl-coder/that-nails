import { validationSchema } from '@thatnails/shared';
import type z from 'zod';
import Button from '../../core-components/button/Button';
import Form from '../../core-components/form/Form';
import Heading from '../../core-components/heading/Heading';
import Input from '../../core-components/input/Input';
import Backdrop from '../../core-components/modal/Backdrop';
import type { IBaseModal } from '../../core-components/modal/ModalContainer';
import modalService from '../../core-components/modal/modalService';
import ModalTransition from '../../core-components/modal/ModalTransition';
import { useCreateSalonMutation } from '../../store/salons.api';

interface Props extends IBaseModal {}

export default function CreateSalonModal(props: Props): React.JSX.Element {
  const { isOpen } = props;
  const [createSalon] = useCreateSalonMutation();

  const handleSubmit = (
    data: z.infer<typeof validationSchema.salons.create>,
  ) => {
    createSalon(data);
    modalService.closeModal(props.id);
  };

  return (
    <ModalTransition isOpen={isOpen}>
      <Form
        validationSchema={validationSchema.salons.create}
        onSubmit={handleSubmit}
        className="bg-white w-96 shrink-0 z-20 p-6 space-y-4"
      >
        <Heading.H1>Create Salon</Heading.H1>
        <Input.Group>
          <Input.Container>
            <Input.Text fieldName="name" placeholder="Salon Name" />
            <Input.Error fieldName="name" />
          </Input.Container>
          <Input.Container>
            <Input.Text fieldName="address" placeholder="Salon Address" />
            <Input.Error fieldName="address" />
          </Input.Container>
          <Input.Container>
            <Input.Text fieldName="phone" placeholder="Salon Phone" />
            <Input.Error fieldName="phone" />
          </Input.Container>
          <Input.Container>
            <Input.Text fieldName="email" placeholder="Salon Email" />
            <Input.Error fieldName="email" />
          </Input.Container>
        </Input.Group>
        <Button type="submit">Create Salon</Button>
      </Form>

      <Backdrop />
    </ModalTransition>
  );
}
