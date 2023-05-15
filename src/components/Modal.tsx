import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  confirmBtnLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  confirmBtnLabel,
  onConfirm,
  onCancel,
}) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    isOpen ? handleOpenModal() : handleCloseModal();
  }, [isOpen]);

  const handleOpenModal = () => {
    setVisible(true);
    setShouldRender(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 300); // Wait for the fade-out animation to finish (300ms)
  };

  const handleCancel = () => {
    onCancel && onCancel();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <>
      {shouldRender && (
        <ModalContainer $visible={visible} $shouldRender={shouldRender}>
          <ModalContent>
            <Title>{title}</Title>
            <ButtonContainer>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button $primary onClick={handleConfirm}>
                {confirmBtnLabel || "Confirm"}
              </Button>
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default Modal;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const ModalContainer = styled.div<{
  $visible: boolean;
  $shouldRender: boolean;
}>`
  display: ${({ $shouldRender }) => ($shouldRender ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: ${({ $visible }) => ($visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
  z-index: 9999;
  animation-fill-mode: forwards;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme?.color.bright};
  width: 400px;
  padding: 24px;
  border-radius: ${({ theme }) => theme?.borderRadius}px;
  text-align: center;
`;

const Title = styled.h2``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 24px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  background-color: ${({ theme, $primary }) =>
    $primary ? theme?.color?.error : theme?.color?.natural};
  padding: 8px 16px;
  border-radius: 12px;

  &:hover {
    opacity: 0.6;
  }
`;
