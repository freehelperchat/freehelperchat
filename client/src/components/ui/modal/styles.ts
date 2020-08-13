import styled, { keyframes } from 'styled-components';

interface IProps {
  show: boolean;
}

const fadeIn = keyframes`
  0% {
    transform: translateY(0);
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  99% {
    transform: translateY(0);
    opacity: 0;
  }

  100% {
    transform: translateY(-150vh);
    opacity: 0;
  }
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  position: absolute;
  background-color: #000000aa;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: ${(props: IProps) => (props.show ? fadeIn : fadeOut)};
  animation-duration: 0.2s;
  transform: ${(props: IProps) =>
    props.show ? 'translateY(0)' : 'translateY(-150vh)'};
`;

export const Window = styled.div`
  width: fit-content;
  background-color: white;
  border-radius: 10px;
  max-width: 70%;
  transform: ${(props: IProps) =>
    props.show ? 'translateY(0)' : 'translateY(-150vh)'};
  transition: all 0.3s ease-out;
  padding: 20px;
`;
