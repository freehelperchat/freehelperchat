import styled from 'styled-components';

export const Cell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin: 2px;

  span {
    width: 100%;
    padding: 2px;
  }

  span:first-child {
    width: 62%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
`;

export const Title = styled.div`
  width: 40% !important;
  color: white;
  text-align: -webkit-right;
  margin-right: 4px;
`;

export const Text = styled.p`
  width: fit-content;
  overflow-wrap: anywhere;
  background-color: #a5a5a5;
  border-radius: 10px;
  padding: 8px;
`;

export const Content = styled.p`
  font-weight: 700;
  width: 60%;
  color: #a5a5a5;
  word-wrap: break-word;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto auto;
  justify-content: center;
  margin-bottom: 20px;

  button {
    margin: 5px;
  }
  span {
    margin: 2px;
  }
`;
