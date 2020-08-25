import styled from 'styled-components';

export const Container = styled.div`
  width: 40px;
  height: 60px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;

  div {
    width: 100%;
    height: 3px;
    background-color: #aaa;
  }

  @media (min-width: 500px) {
    display: none;
  }
`;
