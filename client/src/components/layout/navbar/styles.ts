import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Title = styled.p`
  font-size: 20px;
  color: #aaa;
  padding: 8px;
  width: 100%;
`;

const Bar = styled.div`
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #202020;
  }

  ::-webkit-scrollbar-thumb {
    height: 20px;
    background-color: #acacac;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

export const TopBar = styled(Bar)`
  flex: 1;
  width: 100%;
  overflow: scroll;
  padding-top: 10px;
  scroll-behavior: smooth;
  overflow-x: hidden;
  scrollbar-width: none;
`;

export const BottomBar = styled(Bar)`
  flex: 0;
  width: 100%;
`;
