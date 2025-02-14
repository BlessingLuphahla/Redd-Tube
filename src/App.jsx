import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  color: black;
`;

const Main = styled.div`
  display: flex;
  flex: 7;
`;

const Wrapper = styled.div`
  flex: 1;
`;

function App() {
  return (
    <Container>
      <Menu />
      <Main>
        <Navbar />
        <Wrapper>Video Cards</Wrapper>
      </Main>
    </Container>
  );
}

export default App;
