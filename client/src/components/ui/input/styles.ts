import styled from 'styled-components';

interface IProps {
  active: boolean;
}

export const Container = styled.div`
  border: solid 1px #ccc;
  border-radius: 32px;
  box-sizing: border-box;
  margin: 16px 0 0 0;
  padding: 8px 8px;
  position: relative;
  width: 100%;
  transition: border 0.2s ease-out;
  background-color: #101010;
  display: flex;
  align-items: center;

  border-color: ${(props: IProps) => (props.active ? '#0d89ee' : undefined)};
  transition: ${(props: IProps) =>
    props.active ? 'border 0.2s ease-in-out' : undefined};
  label {
    color: ${(props: IProps) => (props.active ? '#ccc' : undefined)};
    background-color: ${(props: IProps) =>
      props.active ? '#101010' : undefined};
    transform: ${(props: IProps) =>
      props.active ? 'translate(12px, -30px) scale(0.75)' : undefined};
  }

  :active,
  :focus-within {
    border-color: #0d89ee;
    transition: border 0.2s ease-in-out;
    label {
      color: #ccc;
      background-color: #101010;
      transform: translate(12px, -30px) scale(0.75);
    }
  }
`;

export const Label = styled.label`
  background-color: rgba(0, 0, 0, 0);
  color: #777777;
  font-size: 16px;
  position: absolute;
  transform-origin: top left;
  transform: translate(10px, 0) scale(1);
  transition: all 0.2s ease-in-out;
  cursor: text;
  pointer-events: none;
`;

export const Input = styled.input`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  outline: 0;
  padding: 16px 10px;
  width: 100%;
  color: white;
`;

export const Select = styled.select`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 16px;
  outline: 0;
  padding: 16px 10px;
  width: 100%;
  color: white;
`;

export const TextArea = styled.textarea`
  resize: none;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  outline: 0;
  padding: 12px 16px;
  height: 44px;
  min-height: 44px;
  max-height: 200px;
  width: 100%;
  color: white;

  :-webkit-scrollbar {
    width: 3px;
  }
  :-webkit-scrollbar-track {
    background-color: #e6e6e6;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }
  :-webkit-scrollbar-thumb {
    height: 20px;
    background-color: #202020;
    outline: 0.1px solid #999fa5;
  }
`;
