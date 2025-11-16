import type z from 'zod';
import type {
  JsonSelectable,
  SalonTable,
} from '../../../../../shared/dist/esm/types/db.type';
import { validationSchema } from '../../../../../shared/dist/esm/validations/index.validation';
import Form from '../../../core-components/form/Form';
import Heading from '../../../core-components/heading/Heading';
import Input from '../../../core-components/input/Input';
import Backdrop from '../../../core-components/modal/Backdrop';
import type { IBaseModal } from '../../../core-components/modal/ModalContainer';
import ModalTransition from '../../../core-components/modal/ModalTransition';
import { useCreateSalonOwnerMutation } from '../../../store/salons.api';
import Button from '../../../core-components/button/Button';
import UpdateSalonModal from './UpdateSalonModal';
import modalService from '../../../core-components/modal/modalService';

interface Props extends IBaseModal {
  salon: JsonSelectable<SalonTable>;
}

export default function CreateSalonOwnerForm(props: Props): React.JSX.Element {
  const { salon } = props;
  const [createSalonOwner] = useCreateSalonOwnerMutation();

  const handleSubmit = (
    data: z.infer<typeof validationSchema.salons.createSalonOwner>,
  ) => {
    createSalonOwner({ ...data, salonId: salon.id });
    modalService.closeModal(props.id);
    modalService.openAsyncModal(UpdateSalonModal, { salon });
  };

  return (
    <ModalTransition isOpen={props.isOpen}>
      <Form
        validationSchema={validationSchema.salons.createSalonOwner}
        onSubmit={handleSubmit}
        className='bg-white w-96 shrink-0 z-20 p-6 space-y-4'
        defaultValues={{ salon_id: salon.id }}
      >
        <Heading.H1>Create Owner</Heading.H1>
        <Input.Group>
          <Input.Container>
            <Input.Text
              fieldName='email_or_phone'
              placeholder='Email or Phone'
            />
            <Input.Error fieldName='email_or_phone' />
          </Input.Container>
        </Input.Group>
        <Button type='submit'>Add Owner</Button>
      </Form>
      <Backdrop />
    </ModalTransition>
  );
}
