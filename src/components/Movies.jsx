import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const Movies = () => {
  return <Container>Movies feature is not available yet.</Container>;
};

export default Movies;