import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";
import { useScreen } from "../context/ScreenContext";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
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
  width: ${({ isMobile }) => (isMobile ? "90px" : "105px")};
  height: ${({ isMobile }) => (isMobile ? "fit-content" : "45px")};
  background-color: transparent;
  border: 1px solid #3eafff;
  color: #3eafff;
  border-radius: 3px;
  outline: none;
  margin-top: 10px;
  padding: ${({ isMobile }) => isMobile && "5px"};
  cursor: pointer;
`;

const Search = styled.div`
  position: absolute;
  display: flex;
  top: 10%;
  right: 0;
  left: 0;
  margin: auto;
  width: 30%;
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

function Navbar() {
  const { isMobile } = useScreen();

  return (
    <Container>
      <Wrapper isMobile={isMobile}>
        {isMobile && <div>test</div>}
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
      </Wrapper>
    </Container>
  );
}

export default Navbar;
