import styled from 'styled-components';

interface IProps {
  open: boolean;
}

export const Container = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: #0b3980;
  padding: 32px 16px;
  box-sizing: border-box;
  transition: transform 0.3s ease-out;
  transform: ${(props: IProps) =>
    props.open ? 'translateX(0)' : 'translateX(-100%)'};
`;

export const LogoContainer = styled.div`
  height: 11%;
  margin-bottom: 32px;
`;
