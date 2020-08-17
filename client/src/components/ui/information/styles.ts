import styled from 'styled-components';

interface IProps {
  color: string;
}

export const Bar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.p`
  font-family: Ubuntu, sans-serif;
  font-size: 20px;
  color: ${(props: IProps) => props.color};
`;
