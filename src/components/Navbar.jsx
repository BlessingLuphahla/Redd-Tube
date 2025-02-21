import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useScreen } from "../context/ScreenContext";
import Menu from "./Menu";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import LogoImg from "../assets/images/logo.jpg";
import { DEFAULT_PROFILE_PIC } from "../utils/constants";
import VideoCallIcon from "@mui/icons-material/VideoCall";

// Styled components
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 10;
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: ${({ isMobile }) =>
    isMobile ? "space-between" : "flex-end"};
  position: relative;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 105px;
  height: 45px;
  background-color: transparent;
  border: 1px solid #3eafff;
  color: #3eafff;
  border-radius: 3px;
  outline: none;
  margin-top: 10px;
  cursor: pointer;
`;

const Search = styled.div`
  position: ${({ isMobile }) => !isMobile && "absolute"};
  display: flex;
  top: 10%;
  right: 0;
  left: 0;
  margin: auto;
  width: ${({ isMobile }) => (isMobile ? "70%" : "30%")};
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-left: ${({ isMobile }) => isMobile && "10px"};
`;

const Input = styled.input`
  border: none;
  width: ${({ isMobile }) => (isMobile ? "80%" : "92%")};
  padding: 5px;
  background-color: transparent;
  height: ${({ isMobile }) => (isMobile ? "80%" : "100%")};
  font-size: 16px;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
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

const Img = styled.img`
  height: 43px;
  width: 43px;
  position: ${({ isMobile }) => !isMobile && "absolute"};
  bottom: -50%;
  right: 100%;
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

// eslint-disable-next-line react/prop-types
function Navbar({ setTheme, theme }) {
  const { isMobile } = useScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState("");

  const handleMenuToggle = () => {
    try {
      setIsMenuOpen((prev) => !prev);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const { user: currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Wrapper isMobile={isMobile}>
        {isMobile ? (
          <>
            <MenuIcon
              onClick={handleMenuToggle}
              style={{ cursor: "pointer" }}
            />
            <Search isMobile={isMobile}>
              <Input isMobile={isMobile} placeholder="Search" />
              <SearchIcon />
            </Search>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo isMobile={isMobile}>
                <Img isMobile={isMobile} src={LogoImg} alt="logo" />
                Axe Media
              </Logo>
            </Link>
          </>
        ) : (
          <MenuContainer>
            <Search isMobile={isMobile}>
              <Input isMobile={isMobile} placeholder="Search" />
              <SearchIcon />
            </Search>
            {currentUser ? (
              <UserDetails>
                <VideoCallIcon />
                <UserImage
                  src={
                    currentUser?.profilePic
                      ? currentUser?.profilePic
                      : DEFAULT_PROFILE_PIC
                  }
                />
                <Username>{currentUser?.username}</Username>
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
            />
          </MobileMenu>
        )}
      </Wrapper>
    </Container>
  );
}

export default Navbar;
