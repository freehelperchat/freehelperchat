import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const Form = styled.div`
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid black;
  justify-self: center;
`;

export const NotificationContainer = styled.div`
  justify-self: flex-end;
  margin-left: 5%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
