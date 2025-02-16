import { useContext } from "react";
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
  width: 300px;
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

const More = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  margin-top: 10px;
  color: ${({ theme }) => theme.text};
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

function SignIn() {
  
  return (
    <Container>
      <MainWrapper>
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
      <More>
        English(USA)
        <Links>
          <Link style={{ textDecoration: "none", color: "inherit" }}>Help</Link>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            Privacy
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }}>
            Privacy
          </Link>
        </Links>
      </More>
    </Container>
  );
}

export default SignIn;
