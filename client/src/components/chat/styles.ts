import styled from 'styled-components';

interface IProps {
  active?: boolean;
}

export const ChatContainer = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  form {
    width: 100%;
  }
`;

export const TextContainer = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Dropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: ${(props: IProps) => (props.active ? '100%' : 0)};
  height: ${(props: IProps) => (props.active ? '100%' : 0)};
  overflow: hidden;
  transform-origin: center;
  transition: 0.4s all ease-in-out;

  p {
    color: #a5a5a5;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 20px;
  }
`;
