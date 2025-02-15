import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { DarkTheme } from "./utils/Theme";
import { useState } from "react";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  flex: 1;
`;

function App() {
  const [theme, setTheme] = useState(DarkTheme);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Menu theme={theme} setTheme={setTheme} />
        <Main>
          <Navbar />
          <Wrapper>
            <h2>test</h2>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
