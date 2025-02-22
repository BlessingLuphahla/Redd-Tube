import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
`;

/**
 * Articles component
 *
 * This component is a placeholder for the Articles feature.
 * It currently displays a message that the feature is not available yet.
 */
const Articles = () => {
  return (
    <Container>
      {/* Display a placeholder message */}
      Articles feature is not available yet.
    </Container>
  );
};

export default Articles;
