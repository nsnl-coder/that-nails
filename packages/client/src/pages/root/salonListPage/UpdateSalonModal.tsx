import type z from 'zod';
import type {
  JsonSelectable,
  SalonTable,
} from '../../../../../shared/dist/esm/types/db.type';
import { validationSchema } from '../../../../../shared/dist/esm/validations/index.validation';
import Button from '../../../core-components/button/Button';
import Form from '../../../core-components/form/Form';
import Input from '../../../core-components/input/Input';
import Backdrop from '../../../core-components/modal/Backdrop';
import type { IBaseModal } from '../../../core-components/modal/ModalContainer';
import modalService from '../../../core-components/modal/modalService';
import ModalTransition from '../../../core-components/modal/ModalTransition';
import TabButton from '../../../core-components/tabs/TabButton';
import TabContainer from '../../../core-components/tabs/TabContainer';
import TabPannel from '../../../core-components/tabs/TabPanel';
import { useUpdateSalonMutation } from '../../../store/salons.api';
import CreateOwnerForm from './CreateOwnerForm';

interface Props extends IBaseModal {
  salon: JsonSelectable<SalonTable>;
}

export default function UpdateSalonModal(props: Props): React.JSX.Element {
  const [updateSalon] = useUpdateSalonMutation();
  const salon = props.salon;

  const handleSubmit = (
    data: z.infer<typeof validationSchema.salons.update>,
  ) => {
    updateSalon({ id: salon.id, ...data });
    modalService.closeModal(props.id);
  };

  const openCreateOwnerModal = () => {
    modalService.closeModal(props.id);
    modalService.openAsyncModal(CreateOwnerForm, { salon });
  };

  return (
    <ModalTransition isOpen={props.isOpen}>
      <Form
        validationSchema={validationSchema.salons.update}
        onSubmit={handleSubmit}
        className="bg-white w-96 shrink-0 z-20 p-6 space-y-4"
        defaultValues={props.salon}
      >
        <TabContainer
          initialTab="update"
          tabButtonClassName="w-full text-center py-2"
          activeTabButtonClassName="bg-gray-200"
        >
          <div className="flex items-center justify-between">
            <TabButton tabName="update">Update</TabButton>
            <TabButton tabName="owners">Owners</TabButton>
          </div>
          <TabPannel tabName="update" className="space-y-4">
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
            <Button type="submit">Update Salon</Button>
          </TabPannel>
          <TabPannel tabName="owners">
            <Button onClick={openCreateOwnerModal} type="button">
              Create owner
            </Button>
          </TabPannel>
        </TabContainer>
      </Form>
      <Backdrop />
    </ModalTransition>
  );
}
