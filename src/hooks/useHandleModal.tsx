import { useState } from 'react';

export default function useHandleModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState<string | undefined>(undefined);

  function openModal(key?: string) {
    setModalKey(key);
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
    setModalKey(undefined);
  };

  return {
    isOpen,
    modalKey,
    setModalKey,
    openModal,
    closeModal,
  };
}
