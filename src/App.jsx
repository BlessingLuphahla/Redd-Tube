import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { LightTheme, DarkTheme } from "./utils/Theme"; // Import both themes
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Settings from "./pages/Settings";
import { useScreen } from "./context/ScreenContext";
import ContactDeveloper from "./components/ContactDeveloper";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivPolicy from "./components/PrivPolicy";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setReduxTheme } from "./redux/userSlice";
import History from "./components/History";
import Sports from "./components/Sports";
import Library from "./components/Library";
import Articles from "./components/Articles";
import Movies from "./components/Movies";

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

// Create a separate component for the routes to use `useLocation`
const AppRoutes = () => {
  const location = useLocation(); // Now `useLocation` is inside the Router context

  return (
    <Wrapper
      style={{
        padding: location.pathname === "/login" ? "0px" : "22px 45px",
      }}
    >
      <Routes>
        <Route path="/">
          <Route index element={<Home type="random" />} />
          <Route path="subscriptions" element={<Home type="subs" />} />
          <Route path="trends" element={<Home type="trends" />} />
          <Route path="video">
            <Route path=":videoId" element={<Video />} />
          </Route>
          <Route path="login" element={<SignIn />} />
          <Route path="privacy-policy" element={<PrivPolicy />} />
          <Route path="settings" element={<Settings />} />
          <Route path="contact-developer" element={<ContactDeveloper />} />
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />

          {/* New Routes */}
          <Route path="history" element={<History />} />
          <Route path="sports" element={<Sports />} />
          <Route path="library" element={<Library />} />
          <Route path="articles" element={<Articles />} />
          <Route path="movies" element={<Movies />} />
        </Route>
      </Routes>
    </Wrapper>
  );
};

function App() {
  const [theme, setTheme] = useState(DarkTheme); // Default theme
  const { isMobile } = useScreen();
  const { user: currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const API = import.meta.env.VITE_API_URL;

  // Fetch the user's theme preference when they log in
  useEffect(() => {
    const fetchThemePreference = async () => {
      if (currentUser) {
        try {
          const res = await axios.get(
            `${API}/api/users/theme/${currentUser._id}`
          );
          const userTheme = res.data.theme;

          // Apply the user's theme preference
          setTheme(userTheme === "light" ? LightTheme : DarkTheme);
        } catch (error) {
          console.error("Failed to fetch theme preference:", error);
        }
      }
    };

    fetchThemePreference();
  }, [API, currentUser]);

  /**
   * Save the user's theme preference when they change it.
   * @param {string} newTheme The new theme to be saved. Can be "light" or "dark".
   */
  const handleSetTheme = async (newTheme) => {
    if (!currentUser) return; // If user is not logged in, do nothing

    try {
      // Update theme in MongoDB
      const res = await axios.put(`${API}/api/users/theme/${currentUser._id}`, {
        theme: newTheme,
      });

      const { theme } = res.data;
      dispatch(setReduxTheme(theme));

      // Update local state
      if (res.status === 200) {
        setTheme(theme === "light" ? LightTheme : DarkTheme);
      }
    } catch (error) {
      console.error("Failed to update theme preference:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <BrowserRouter>
          {!isMobile && <Menu theme={theme} handleSetTheme={handleSetTheme} />}
          <Main>
            <Navbar
              setTheme={(newTheme) => handleSetTheme(newTheme)}
              theme={theme}
            />
            <AppRoutes /> {/* Use the AppRoutes component here */}
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
