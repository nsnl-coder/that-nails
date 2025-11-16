import React, { type SetStateAction } from 'react';
import { v4 } from 'uuid';
import type { AsyncModalFunction } from './ModalContainer';

class ModalService {
  private modals: React.JSX.Element[] = [];
  private setModals: React.Dispatch<SetStateAction<React.JSX.Element[]>> =
    () => {};

  register(setModals: React.Dispatch<SetStateAction<React.JSX.Element[]>>) {
    this.setModals = (value) => {
      setModals((prev) => {
        const newValue = typeof value === 'function' ? value(prev) : value;
        this.modals = newValue;
        return newValue;
      });
    };
  }

  openAsyncModal: AsyncModalFunction = (Modal, props) => {
    return new Promise((resolve) => {
      const resolveAndCloseModal = (payload: any) => {
        resolve(payload);
        this.closeLastModal();
      };

      const modalProps = {
        ...props,
        resolve: resolveAndCloseModal,
        isOpen: true,
        id: v4(),
      } as any;

      const newModal = <Modal {...modalProps} key={modalProps.id} />;
      this.setModals((prev) => [...prev, newModal]);
    });
  };

  closeModal = (id: string, skipAnimation = false) => {
    if (skipAnimation) {
      this.setModals((prev) => prev.filter((m) => m.props.id !== id));
      return;
    }

    this.setModals((prev) => {
      const updatedModals = [...prev];

      const index = updatedModals.findIndex((modal) => modal.props.id === id);
      const modal = updatedModals[index];

      if (!modal) return prev;

      const clonedModal = React.cloneElement(modal, {
        isOpen: false,
      });

      updatedModals[index] = clonedModal;

      setTimeout(() => {
        this.setModals((prev) =>
          prev.filter((m) => m !== clonedModal && m !== modal),
        );
      }, 300);

      return updatedModals;
    });
  };

  closeLastModal = () => {
    const lastModalIndex = this.modals.length - 1;
    const lastModal = this.modals[lastModalIndex];

    if (!lastModal) return;

    this.closeModal(lastModal.props.id);
  };

  get isModalOpen() {
    return this.modals.length > 0;
  }
}

const modalService = new ModalService();
export default modalService;
