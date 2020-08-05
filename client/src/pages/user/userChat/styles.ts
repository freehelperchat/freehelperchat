import styled from 'styled-components';

export const Container = styled.div`
  width: 60%;

  @media (min-width: 700px) {
    width: 45%;
  }

  @media (min-width: 1000px) {
    width: 35%;
  }
`;
