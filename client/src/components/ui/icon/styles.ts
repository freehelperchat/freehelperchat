import styled from 'styled-components';

interface IProps {
  path: string;
  color?: string;
  size?: string;
  minSize?: string;
  maxSize?: string;
  margin?: string;
}

export const Container = styled.div`
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-image: ${(props: IProps) => `url(${props.path})`};
  -webkit-mask-image: ${(props: IProps) => `url(${props.path})`};
  background-color: ${(props: IProps) => props.color};
  min-width: ${(props: IProps) => props.minSize};
  min-height: ${(props: IProps) => props.minSize};
  width: ${(props: IProps) => props.size};
  height: ${(props: IProps) => props.size};
  margin: ${(props: IProps) => props.margin};
  max-height: ${(props: IProps) => props.maxSize};
  max-width: ${(props: IProps) => props.maxSize};
`;
