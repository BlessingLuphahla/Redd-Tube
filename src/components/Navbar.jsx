import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div``;

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

const Search = styled.div``;
const Input = styled.input``;

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Search>
          <Input type="search" placeholder="Search" />
          <SearchIcon />
        </Search>
        <Button>
          <PersonIcon />
          Sign In
        </Button>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
