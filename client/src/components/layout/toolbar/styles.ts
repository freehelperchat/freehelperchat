import styled from 'styled-components';

interface IProps {
  side?: 'left' | 'right';
  logo?: boolean;
  fitContent?: boolean;
}

export const Container = styled.header`
  height: 100%;
  min-width: 250px;
  max-width: 250px;
  top: 0;
  background: #202020;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  z-index: 90;
  left: ${(props: IProps) => (props.side === 'left' ? 0 : undefined)};
  right: ${(props: IProps) => (props.side === 'right' ? 0 : undefined)};
  width: ${(props: IProps) => (props.fitContent ? 'fit-content' : '300px')};

  nav {
    width: 100%;
  }

  @media (max-width: 499px) {
    justify-content: space-between;
  }
`;

export const LogoContainer = styled.div`
  width: 100%;
`;

export const Desktop = styled.nav`
  height: ${(props: IProps) =>
    props.logo ? 'calc(100% - (128px + 16px))' : '100%'};
  @media (max-width: 499px) {
    display: none;
  }
`;
