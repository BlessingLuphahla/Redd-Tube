import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { DarkTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Login from "./pages/SignIn";

import useScreenWidth from "./hooks/useScreenWidth";
import { MediaQueryBreakPoints } from "./utils/Theme";

import { ScreenProvider } from "./context/ScreenContext";

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
  padding: 22px 45px;
`;

function App() {
  const [theme, setTheme] = useState(DarkTheme);

  const screenWidth = useScreenWidth();

  const isMobile = screenWidth < parseInt(MediaQueryBreakPoints.mobile);

  return (
    <ScreenProvider>
      <ThemeProvider theme={theme}>
        <Container>
          <BrowserRouter>
            {isMobile ? (
              <Menu theme={theme} setTheme={setTheme} />
            ) : (
              <MobileMenu />
            )}
            <Main>
              <Navbar />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="video">
                      <Route path=":id" element={<Video />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                  </Route>
                </Routes>
              </Wrapper>
            </Main>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </ScreenProvider>
  );
}

export default App;
