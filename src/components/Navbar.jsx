/* eslint-disable react/prop-types */
import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router"; // Update to use "react-router-dom" instead of "react-router"
import { useState } from "react";
import { useScreen } from "../context/ScreenContext";
import Menu from "./Menu";
import LogoImg from "../assets/images/logo.jpg";

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
  width: "105px";
  height: "45px";
  background-color: transparent;
  border: 1px solid #3eafff;
  color: #3eafff;
  border-radius: 3px;
  outline: none;
  margin-top: 10px;
  cursor: pointer;
`;

const Search = styled.div`
  position: absolute;
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
  display: "flex";
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
  position: absolute;
  bottom: -50%;
  right: 100%;
`;

function Navbar({ setTheme, theme }) {
  const { isMobile } = useScreen();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Container>
      <Wrapper isMobile={isMobile}>
        {isMobile ? (
          <>
            <MenuIcon
              onClick={handleMenuToggle}
              style={{ cursor: "pointer" }}
            />
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo isMobile={isMobile}>
                <Img src={LogoImg} alt="logo" />
                Axe-Media
              </Logo>
            </Link>
          </>
        ) : (
          <MenuContainer>
            <Search isMobile={isMobile}>
              <Input isMobile={isMobile} placeholder="Search" />
              <SearchIcon />
            </Search>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button isMobile={isMobile}>
                <PersonIcon />
                Sign In
              </Button>
            </Link>
          </MenuContainer>
        )}

        {isMobile && isMenuOpen && (
          // Mobile menu when hamburger is clicked
          <MobileMenu isOpen={isMenuOpen}>
            <Search isMobile={isMobile}>
              <Input isMobile={isMobile} placeholder="Search" />
              <SearchIcon />
            </Search>
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
