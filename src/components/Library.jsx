import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

const Library = () => {
  return <Container>Library feature is not available yet.</Container>;
};

export default Library;