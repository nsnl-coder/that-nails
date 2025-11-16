import React, { useEffect, useState } from 'react';
import cn from '../../utils/cn.util';
import modalService from './modalService';

export interface IBaseModal {
  id: string;
  resolve: (payload: unknown) => void;
  isOpen: boolean;
}

export type AsyncModalFunction = <P extends IBaseModal>(
  modal: (props: P) => React.JSX.Element,
  props: Omit<P, 'resolve' | 'isOpen' | 'id'>,
) => Promise<any>;

export default function ModalContainer(): React.JSX.Element {
  const [modals, setModals] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    modalService.register(setModals);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modalService.closeLastModal();
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          modalService.closeLastModal();
        }
      });
    };
  }, []);

  return (
    <div className={cn(modals.length === 0 ? 'hidden' : 'fixed inset-0 z-50')}>
      {modals}
    </div>
  );
}
