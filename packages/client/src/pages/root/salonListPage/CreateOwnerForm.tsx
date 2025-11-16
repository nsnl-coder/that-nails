import type {
  JsonSelectable,
  SalonTable,
} from '../../../../../shared/dist/esm/types/db.type';
import type { IBaseModal } from '../../../core-components/modal/ModalContainer';
import ModalTransition from '../../../core-components/modal/ModalTransition';

interface Props extends IBaseModal {
  salon: JsonSelectable<SalonTable>;
}

export default function CreateOwnerForm(props: Props): React.JSX.Element {
  const { salon } = props;

  return (
    <ModalTransition isOpen={props.isOpen}>
      {/* <Form validationSchema={}> */}

      {/* </Form> */}
    </ModalTransition>
  );
}
