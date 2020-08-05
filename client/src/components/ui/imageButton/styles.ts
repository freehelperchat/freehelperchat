import styled from 'styled-components';

interface IProps {
  backgroundColor: string;
  hoverColor?: string;
  padding?: string;
}

export const ImgButton = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: ${(props: IProps) => props.backgroundColor};
  outline: none;
  border: none;
  padding: ${(props: IProps) =>
    props.backgroundColor !== 'transparent' ? props.padding : undefined};
  border-radius: 30px;
  transition: all 0.2s;
  cursor: pointer;

  :hover {
    background-color: ${(props: IProps) =>
      props.backgroundColor !== 'transparent' ? props.hoverColor : undefined};
  }
  :active {
    filter: brightness(90%) saturate(50%);
    transition: all 0.1s;
  }

  div:hover {
    background-color: ${(props: IProps) =>
      props.backgroundColor === 'transparent' ? props.hoverColor : undefined};
  }
`;
