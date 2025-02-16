import { Link } from "react-router";
import styled from "styled-components";
import { useScreen } from "../context/ScreenContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 90px);
`;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px;
  text-align: center;
  width: ${({ isMobile }) => (isMobile ? "320px" : "350px")};
`;

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const HeaderText = styled.h1`
  font-size: 20px;
`;

const SubText = styled.h2`
  font-size: 16px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  height: 40px;
  padding: 10px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.soft};
  width: 95%;
`;

const Button = styled.button`
  width: 100px;
  padding: 13px 0px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.bg};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Links = styled.div`
  display: flex;
  gap: 15px;
  color: ${({ theme }) => theme.text};
  width: fit-content;
  margin-top: 10px;
`;

function SignIn() {
  const { isMobile } = useScreen();

  return (
    <Container>
      <MainWrapper isMobile={isMobile}>
        <SignInWrapper>
          <HeaderText>Sign In</HeaderText>
          <SubText>to continue AXE MEDIA</SubText>
          <Input type="text" placeholder="username" />
          <Input type="password" placeholder="password" />
          <Button>Sign In</Button>
        </SignInWrapper>
        <SignUpWrapper>
          <SubText>or</SubText>
          <Input type="text" placeholder="username" />
          <Input type="email" placeholder="email" />
          <Input type="password" placeholder="password" />
          <Button>Sign Up</Button>
        </SignUpWrapper>
      </MainWrapper>
      <Links>
        <Link
          to="/contact-developer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Contact Developer
        </Link>
        <Link
          to="/privacy-policy"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Privacy
        </Link>
        <Link
          to="/terms-and-conditions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {"T's and C's"}
        </Link>
      </Links>
    </Container>
  );
}

export default SignIn;
