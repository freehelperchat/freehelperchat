import React from 'react';

import { Container, Window } from './styles';

interface IProps {
  show: boolean;
  closeModal(): void;
}

const Modal: React.FC<IProps> = ({ show, closeModal, children }) => {
  return (
    <Container show={show} onClick={closeModal}>
      <Window show={show} onClick={event => event.stopPropagation()}>
        {children}
      </Window>
    </Container>
  );
};

export default Modal;
