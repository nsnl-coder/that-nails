import modalService from './modalService';

interface Props {
  modalId?: string;
}

export default function Backdrop(props: Props): React.JSX.Element {
  const { modalId } = props;

  return (
    <div
      onClick={() =>
        modalId
          ? modalService.closeModal(modalId)
          : modalService.closeLastModal()
      }
      className="fixed inset-0 bg-black/50 z-10"
    />
  );
}
