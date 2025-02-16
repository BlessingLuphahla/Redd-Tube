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
  text-align: center;
  width: 20vw;
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
`;

const Button = styled.button`
    width: 100px;
`;

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
