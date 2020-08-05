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

export const ChatInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 32px;
  padding: 16px;

  div {
    width: 100%;
  }

  @media (min-width: 900px) {
    width: 39%;
    height: 100%;
    margin-bottom: 0;
  }
`;
