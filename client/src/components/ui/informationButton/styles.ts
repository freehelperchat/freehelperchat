import styled from 'styled-components';

interface IProps {
  backgroundColor: string;
}

export const InfoButton = styled.button`
  width: 100%;
  min-width: 200px;
  min-height: 100px;
  background-color: ${(props: IProps) => props.backgroundColor};
  outline: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export const BottomBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Name = styled.p`
  font-family: Ubuntu, sans-serif;
  font-size: 20px;
  color: white;
`;
