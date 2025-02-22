import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { DarkTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";

import { useScreen } from "./context/ScreenContext";
import ContactDeveloper from "./components/ContactDeveloper";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivPolicy from "./components/PrivPolicy";

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

  const { isMobile } = useScreen();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BrowserRouter>
          {!isMobile && <Menu theme={theme} setTheme={setTheme} />}
          <Main>
            <Navbar setTheme={setTheme} theme={theme} />
            <Wrapper
              style={{
                padding: location.pathname === "/login" ? "0px" : "22px 45px",
              }}
            >
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route
                    path="subscriptions"
                    element={<Home type="subs" />}
                  />
                  <Route path="trends" element={<Home type="trends" />} />
                  <Route path="video">
                    <Route path=":videoId" element={<Video />} />
                  </Route>
                  <Route path="login" element={<SignIn />} />
                  <Route path="privacy-policy" element={<PrivPolicy />} />
                  <Route path="settings" element={<Settings />} />
                  <Route
                    path="contact-developer"
                    element={<ContactDeveloper />}
                  />
                  <Route
                    path="terms-and-conditions"
                    element={<TermsAndConditions />}
                  />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
