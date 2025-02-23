/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useScreen } from "../context/ScreenContext";
import Menu from "./Menu";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { DEFAULT_PROFILE_PIC } from "../utils/constants";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Upload from "./Upload";
import { LightTheme } from "../utils/Theme";
// import LogoImg from "../assets/images/logo.jpg";

// Styled components
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  justify-content: ${({ isMobile }) => !isMobile && "flex-end"};
  height: 56px;
  z-index: 10;
  display: flex;
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 105px;
  height: 38px;
  background-color: transparent;
  border: 1px solid #3eafff;
  color: #3eafff;
  border-radius: 3px;
  outline: none;
  margin-top: 10px;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 56px;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 10px;
  z-index: 20;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  font-family: "Courier New", Courier, monospace;
  color: ${({ theme }) => theme.text};
  padding: 0px 20px;
  position: relative;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const UserImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Username = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  text-transform: capitalize;
`;

const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
`;

const MobileIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

function Navbar({ setTheme, theme, handleSetTheme }) {
  const { isMobile } = useScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const handlePopUpVideoPost = () => {
    setPopupIsOpen((prev) => !prev);
  };

  const handleMenuToggle = () => {
    try {
      setIsMenuOpen((prev) => !prev);
      setError("");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const { user: currentUser } = useSelector((state) => state.user);

  const handleTheme = () => {
    const newTheme = theme === LightTheme ? "dark" : "light";
    handleSetTheme(newTheme);
  };

  return (
    <>
      <Container isMobile={isMobile}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Wrapper isMobile={isMobile}>
          {isMobile ? (
            <>
              <MobileHeader>
                <MenuIcon
                  onClick={handleMenuToggle}
                  style={{ cursor: "pointer" }}
                />
                <Link to="/" style={{ textDecoration: "none", margin: "0px" }}>
                  <Logo isMobile={isMobile} style={{ fontSize: "20px" }}>
                    REDD AXE MEDIA
                  </Logo>
                </Link>

                <MobileIcons></MobileIcons>
                {currentUser ? (
                  <UserDetails style={{ marginLeft: "auto" }}>
                    <VideoCallIcon
                      onClick={handlePopUpVideoPost}
                      style={{ cursor: "pointer", color: "purple" }}
                    />
                    <Link
                      to="/settings"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <UserImage
                        src={
                          currentUser?.profilePic
                            ? currentUser?.profilePic
                            : DEFAULT_PROFILE_PIC
                        }
                      />
                    </Link>
                    <Username>{currentUser?.username}</Username>
                  </UserDetails>
                ) : (
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", marginLeft: "auto" }}
                  >
                    <Button isMobile={isMobile}>
                      <PersonIcon />
                      Sign In
                    </Button>
                  </Link>
                )}
              </MobileHeader>
            </>
          ) : (
            <MenuContainer>
              <Link
                to="/"
                style={{ textDecoration: "none", margin: "0px" }}
              ></Link>

              {currentUser ? (
                <UserDetails
                  style={{
                    textDecoration: "none",
                    marginLeft: "auto",
                  }}
                >
                  <VideoCallIcon
                    onClick={handlePopUpVideoPost}
                    style={{ cursor: "pointer", color: "purple" }}
                  />
                  <Link
                    to="/settings"
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      margin: "auto",
                    }}
                  >
                    <UserImage
                      src={
                        currentUser?.profilePic
                          ? currentUser?.profilePic
                          : DEFAULT_PROFILE_PIC
                      }
                    />
                    <Username>{currentUser?.username}</Username>
                  </Link>
                </UserDetails>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button isMobile={isMobile}>
                    <PersonIcon />
                    Sign In
                  </Button>
                </Link>
              )}
            </MenuContainer>
          )}

          {isMobile && isMenuOpen && (
            <MobileMenu isOpen={isMenuOpen}>
              <Menu
                handleMenuToggle={handleMenuToggle}
                isMobile={isMobile}
                setTheme={setTheme}
                theme={theme}
                handleSetTheme={handleTheme}
              />
            </MobileMenu>
          )}
        </Wrapper>
      </Container>
      {popupIsOpen && (
        <Upload setPopupIsOpen={setPopupIsOpen} isMobile={isMobile} />
      )}
    </>
  );
}

export default Navbar;
