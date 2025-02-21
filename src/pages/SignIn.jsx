import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useScreen } from "../context/ScreenContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../../firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";

axios.defaults.withCredentials = true;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 90px);
  position: relative;
`;

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px;
  text-align: center;
  width: ${({ isMobile }) => (isMobile ? "350px" : "400px")};
  margin-top: ${({ isMobile }) => isMobile && "20px"};
  overflow-y: ${({ isMobile }) => isMobile && "scroll"};
  margin-top: ${({ isMobile }) => (isMobile ? "5px" : "20px")};
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
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  width: 100px;
  padding: 13px 0px;
  margin-bottom: 2px;
  background-color: ${({ theme }) => theme.bg};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
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
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let timeout;
    if (successMessage) {
      timeout = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [successMessage]);

  const showMessage = (message) => {
    setSuccessMessage(`${message}🎉`);
  };

  // State for sign-in form
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const API = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  // State for sign-up form
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e, form) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (form === "signIn") {
      setSignInData((prev) => ({ ...prev, [name]: value }));
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Sign in function
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    dispatch(loginStart());

    if (!signInData.username || !signInData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `
        ${API}/api/auth/signin
      `,
        signInData,
        { withCredentials: true }
      );

      dispatch(loginSuccess(res.data));

      // navigate("/subscription");
    } catch (err) {
      setError(err.response.data.message);
      dispatch(loginFailure());
    }

    setSignInData({
      username: "",
      password: "",
    });

    showMessage("Sign In successfull");
  };

  // Sign up function
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    if (!signUpData.username || !signUpData.email || !signUpData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `
        ${API}/api/auth/signup
      `,
        signUpData,
        { withCredentials: true }
      );

      dispatch(loginSuccess(res.data));
    } catch (err) {
      setError(err.response.data.message);
    }

    setSignUpData({
      username: "",
      email: "",
      password: "",
    });

    showMessage("User Created Successfully");
  };

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  // Handle the authentication result after redirect
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (data) => {
        if (data) {
          dispatch(loginStart());
          const userCredentials = {
            username: data.user.displayName,
            email: data.user.email,
            profilePic: data.user.photoURL,
          };

          await axios.post(`${API}/auth/google`, userCredentials);
          dispatch(loginSuccess(userCredentials));
        }
      })
      .catch((error) => {
        console.error("Error during authentication: ", error);
        dispatch(loginFailure());
      });
  }, [API, dispatch]);

  return (
    <Container>
      <MainWrapper isMobile={isMobile}>
        {error && (
          <p style={{ color: "red", marginTop: "10px", marginBottom: "10px" }}>
            {error}
          </p>
        )}
        {successMessage && (
          <p
            style={{ color: "green", marginTop: "10px", marginBottom: "10px" }}
          >
            {successMessage}
          </p>
        )}

        {/* Sign In */}
        <SignInWrapper>
          <HeaderText>Sign In</HeaderText>
          <SubText>to continue AXE MEDIA</SubText>
          <Input
            type="text"
            placeholder="username"
            name="username"
            value={signInData.username}
            onChange={(e) => handleChange(e, "signIn")}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={signInData.password}
            onChange={(e) => handleChange(e, "signIn")}
          />
          <Button onClick={(e) => handleSignIn(e)}>Sign In</Button>
        </SignInWrapper>

        <SignUpWrapper>
          <SubText>or</SubText>
          <Button style={{ width: "150px" }} onClick={signInWithGoogle}>
            SignIn With Google
          </Button>
          <SubText>or</SubText>
          <Input
            type="text"
            placeholder="username"
            name="username"
            value={signUpData.username}
            onChange={(e) => handleChange(e, "signUp")}
          />
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={signUpData.email}
            onChange={(e) => handleChange(e, "signUp")}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={signUpData.password}
            onChange={(e) => handleChange(e, "signUp")}
          />
          <Button onClick={(e) => handleSignUp(e)}>Sign Up</Button>
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
