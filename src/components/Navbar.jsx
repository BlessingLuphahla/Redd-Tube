import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router";

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
  justify-content: flex-end;
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
  width: 92%;
  padding: 5px;
  background-color: transparent;
  height: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border: none;
  }
`;

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" />
          <SearchIcon />
        </Search>
        <Link to="/signIn">
          <Button>
            <PersonIcon />
            Sign In
          </Button>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
