import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px;
`;

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h1``;

const SubText = styled.h2``;

const Input = styled.input``;

const Button = styled.button``;

function Login() {
  return (
    <Container>
      <MainWrapper>
        <SignInWrapper>
          <HeaderText>Sign In</HeaderText>
          <SubText>to continue AXE-MEDIA</SubText>
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
    </Container>
  );
}

export default Login;
