import styled from 'styled-components';

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow-x: hidden;
  scrollbar-width: none;
  background-color: #101010;
  border-radius: 32px;
  padding: 16px;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #101010;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    height: 20px;
    background-color: #e6e6e6;
    outline: 0.1px solid #999fa5;
  }
`;

const Loading = styled.div`
  width: 100%;
  display: flex;

  span {
    margin: 4px 0;
    width: 100%;
  }

  span > span {
    width: 100%;
    height: 64px;
  }
`;

export const RightLoading = styled(Loading)`
  span {
    display: flex;
    align-content: flex-end;
    justify-content: flex-end;
  }

  span > span {
    border-radius: 12px 3px 12px 12px;
  }
`;

export const LeftLoading = styled(Loading)`
  span {
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
  }

  span > span {
    border-radius: 3px 12px 12px 12px;
  }
`;
