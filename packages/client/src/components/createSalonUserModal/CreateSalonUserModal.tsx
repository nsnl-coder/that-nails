import z from 'zod';
import { validationSchema } from '../../../../shared/dist/esm/validations/index.validation';
import Button from '../../core-components/button/Button';
import Form from '../../core-components/form/Form';
import Heading from '../../core-components/heading/Heading';
import Input from '../../core-components/input/Input';
import Backdrop from '../../core-components/modal/Backdrop';
import type { IBaseModal } from '../../core-components/modal/ModalContainer';
import modalService from '../../core-components/modal/modalService';
import ModalTransition from '../../core-components/modal/ModalTransition';
import { useCreateSalonUserMutation } from '../../store/salons.api';

interface Props extends IBaseModal {
  salonId: number;
  cb?: () => void;
}

export default function CreateSalonUserModal(props: Props): React.JSX.Element {
  const [createSalonUser] = useCreateSalonUserMutation();
  const { salonId, cb } = props;

  const handleSubmit = (
    data: z.infer<typeof validationSchema.salons.createSalonUser>,
  ) => {
    createSalonUser({ ...data, salonId });
    modalService.closeModal(props.id);
    cb?.();
  };

  return (
    <ModalTransition isOpen={props.isOpen}>
      <Form
        validationSchema={validationSchema.salons.createSalonUser}
        onSubmit={handleSubmit}
        className="bg-white w-96 shrink-0 z-20 p-6 space-y-4"
        defaultValues={{ salon_id: salonId }}
      >
        <Heading.H1>Create User</Heading.H1>
        <Input.Group>
          <Input.Container>
            <Input.Text
              fieldName="email_or_phone"
              placeholder="Email or Phone"
            />
            <Input.Error fieldName="email_or_phone" />
          </Input.Container>
          <Input.Container>
            <Input.Text fieldName="role" placeholder="Role" />
            <Input.Error fieldName="role" />
          </Input.Container>
        </Input.Group>
        <Button type="submit">Create User</Button>
      </Form>
      <Backdrop />
    </ModalTransition>
  );
}
