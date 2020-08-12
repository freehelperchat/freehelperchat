import styled from 'styled-components';

interface IProps {
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  width?: string;
  height?: string;
}

export const ImgButton = styled.button`
  width: ${(props: IProps) => props.width || 'fit-content'};
  height: ${(props: IProps) => props.height || 'fit-content'};
  background-color: ${(props: IProps) =>
    props.backgroundColor || 'transparent'};
  outline: none;
  border: none;
  padding: ${(props: IProps) =>
    props.backgroundColor !== 'transparent' ? props.padding : undefined};
  border-radius: ${(props: IProps) => props.borderRadius || '30px'};
  transition: all 0.2s;
  cursor: pointer;

  :hover {
    filter: ${(props: IProps) =>
      props.backgroundColor !== 'transparent'
        ? 'brightness(110%) saturate(50%)'
        : undefined};
  }
  :active {
    filter: brightness(90%) saturate(50%);
    transition: all 0.1s;
  }

  div:hover {
    filter: ${(props: IProps) =>
      props.backgroundColor === 'transparent'
        ? 'brightness(110%) saturate(50%)'
        : undefined};
  }
`;
