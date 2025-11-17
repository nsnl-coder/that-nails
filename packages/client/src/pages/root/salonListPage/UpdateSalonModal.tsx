import type z from 'zod';
import type {
  JsonSelectable,
  SalonTable,
} from '../../../../../shared/dist/esm/types/db.type';
import { validationSchema } from '@thatnails/shared';
import SalonUserList from '../../../components/salonUserList/SalonUserList';
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

  return (
    <ModalTransition isOpen={props.isOpen}>
      <Form
        validationSchema={validationSchema.salons.update}
        onSubmit={handleSubmit}
        className='bg-white shrink-0 z-20 p-6 pt-2 space-y-4 min-w-96'
        defaultValues={props.salon}
      >
        <TabContainer
          initialTab='users'
          tabButtonClassName='w-full text-center py-2 font-bold text-black/40'
          activeTabButtonClassName='text-blue-400 font-bold'
        >
          <div className='flex items-center justify-between'>
            <TabButton tabName='update'>Update</TabButton>
            <TabButton tabName='users'>users</TabButton>
          </div>
          <TabPannel tabName='update' className='space-y-4'>
            <Input.Group>
              <Input.Container>
                <Input.Text fieldName='name' placeholder='Salon Name' />
                <Input.Error fieldName='name' />
              </Input.Container>
              <Input.Container>
                <Input.Text fieldName='address' placeholder='Salon Address' />
                <Input.Error fieldName='address' />
              </Input.Container>
              <Input.Container>
                <Input.Text fieldName='phone' placeholder='Salon Phone' />
                <Input.Error fieldName='phone' />
              </Input.Container>
              <Input.Container>
                <Input.Text fieldName='email' placeholder='Salon Email' />
                <Input.Error fieldName='email' />
              </Input.Container>
            </Input.Group>
            <Button type='submit'>Update Salon</Button>
          </TabPannel>
          <TabPannel tabName='users'>
            <SalonUserList salonId={salon.id} />
          </TabPannel>
        </TabContainer>
      </Form>
      <Backdrop />
    </ModalTransition>
  );
}
