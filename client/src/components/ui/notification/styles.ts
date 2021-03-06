import styled from 'styled-components';

interface IProps {
  backgroundColor?: string;
  color?: string;
}

export const Container = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const Message = styled.div`
  border-radius: 30px 0px 30px 30px;
  -moz-border-radius: 30px 0px 30px 30px;
  -webkit-border-radius: 30px 0px 30px 30px;
  padding: 15px;
  width: 100%;
  background-color: ${(props: IProps) => props.backgroundColor};

  p {
    font-family: 'Ubuntu', sans-serif;
    font-size: 18px;
    color: #101010;
  }
`;

export const Timestamp = styled.p`
  font-family: 'Ubuntu', sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 3px;
  color: ${(props: IProps) => props.color};
`;
