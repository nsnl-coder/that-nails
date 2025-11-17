import { validationSchema } from '@thatnails/shared';
import type z from 'zod';

import type { IBaseModal } from '../../../core-components/modal/ModalContainer';
import ModalTransition from '../../../core-components/modal/ModalTransition';
import { useCreateCategoryMutation } from '../../../store/categories.api';
import modalService from '../../../core-components/modal/modalService';
import Heading from '../../../core-components/heading/Heading';
import Form from '../../../core-components/form/Form';
import Input from '../../../core-components/input/Input';
import Button from '../../../core-components/button/Button';
import Backdrop from '../../../core-components/modal/Backdrop';

interface Props extends IBaseModal {
  salonId: number;
}

export default function CreateCategoryModal(props: Props): React.JSX.Element {
  const { isOpen, salonId } = props;
  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = (
    data: z.infer<typeof validationSchema.categories.createCategory>,
  ) => {
    createCategory({ ...data, salonId });
    modalService.closeModal(props.id);
  };

  return (
    <ModalTransition isOpen={isOpen}>
      <Form
        validationSchema={validationSchema.categories.createCategory}
        onSubmit={handleSubmit}
        className='bg-white w-96 shrink-0 z-20 p-6 space-y-4'
      >
        <Heading.H1>Create Category</Heading.H1>
        <Input.Group>
          <Input.Container>
            <Input.Text fieldName='name' placeholder='Category Name' />
            <Input.Error fieldName='name' />
          </Input.Container>
        </Input.Group>
        <Button type='submit'>Create Category</Button>
      </Form>
      <Backdrop />
    </ModalTransition>
  );
}
