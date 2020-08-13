import styled from 'styled-components';

export const Container = styled.div`
  width: 98%;
  height: 98%;
  padding: 28px 2%;
  border-radius: 30px;
  display: flex;
  box-sizing: border-box;
  background: #ccc;
  overflow-y: scroll;

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
  }
`;

export const AdminChatContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;

  @media (min-width: 900px) {
    width: 59%;
    height: 100%;
    margin: 0;
  }
`;
