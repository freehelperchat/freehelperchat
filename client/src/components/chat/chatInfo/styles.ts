import styled from 'styled-components';

export const Cell = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;

  span {
    width: 100%;
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
  margin: 2px;
  padding: 8px;
  border-radius: 10px;
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

  button {
    margin: 5px;
  }
`;
