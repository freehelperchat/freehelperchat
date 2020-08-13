import styled from 'styled-components';

interface IProps {
  backgroundColor?: string;
  color?: string;
}

export const Container = styled.div`
  position: relative;
  margin-bottom: 8px;
`;

export const ItemContainer = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;

  a,
  button {
    background-color: ${(props: IProps) => props.backgroundColor};
    font-family: 'Ubuntu', sans-serif;
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
    width: 100%;
    border-radius: 16px;
    transition: all 0.2s ease-in-out;
    z-index: 20;
    outline: none;
    border: none;
    cursor: pointer;

    div {
      margin-right: 8px;
    }
  }

  @media (min-width: 500px) {
    margin: 0;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 8px;

    a,
    button {
      font-size: 18px;
      color: #fff;
      width: 100%;
      padding: 8px 22px 8px 10px;
      word-break: break-word;
      :hover {
        filter: brightness(110%);
      }
    }
    a:active,
    a.active {
      box-shadow: 0 0 0 3px #909090;
    }
  }
`;

export const BottomIcon = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  background-color: white;
  display: inline-grid;
  grid-template-columns: auto auto auto;
  border-radius: 0px 0px 10px 10px;
  font-size: 22px;
  padding: 0 8px;
  margin-left: 20px;
`;

export const IconContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
`;

export const IconValue = styled.p`
  color: ${(props: IProps) => props.color};
  margin: 0 5px;
`;
