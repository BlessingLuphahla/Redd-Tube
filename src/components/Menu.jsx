/* eslint-disable react/prop-types */
import styled from "styled-components";
import LogoImg from "../assets/images/logo.jpg";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import PersonIcon from "@mui/icons-material/Person";
import { LightTheme, DarkTheme } from "../utils/Theme";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DEFAULT_PROFILE_PIC } from "../utils/constants";

const Container = styled.div`
  flex: 1.2;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.text};
  position: sticky;
  top: 0;
  left: 0;
  overflow-y: scroll;

  /* Scrollbar styles */
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #333;
  }

  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
`;

const Wrapper = styled.div`
  padding: 18px 28px;
`;

const Logo = styled.div`
  display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  color: ${({ theme }) => theme.text};
`;

const Img = styled.img`
  height: 40px;
  width: 40px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
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
  font-size: 16px;
  color: ${({ theme }) => theme.textSoft};
  text-transform: capitalize;
`;

const Email = styled.h3`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

function Menu({ setTheme, theme, isMobile, handleMenuToggle }) {
  const handleSetTheme = () => {
    if (theme === LightTheme) setTheme(DarkTheme);
    else setTheme(LightTheme);
    isMobile && handleMenuToggle();
  };

  const { user: currentUser } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo isMobile={isMobile}>
            <Img src={LogoImg} alt="logo" />
            Axe-Media
          </Logo>
        </Link>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={handleMenuToggle}
        >
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link
          to="/trends"
          style={{ textDecoration: "none" }}
          onClick={handleMenuToggle}
        >
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="/subscriptions"
          style={{ textDecoration: "none" }}
          onClick={handleMenuToggle}
        >
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <SportsEsportsIcon />
          Sports
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Item onClick={handleSetTheme}>
          <SettingsBrightnessIcon />
          {theme === LightTheme ? "Dark Mode" : "Light Mode"}
        </Item>
        <Hr />
        {currentUser ? (
          <UserDetails>
            <UserImage
              src={
                currentUser?.profilePic
                  ? currentUser?.profilePic
                  : DEFAULT_PROFILE_PIC
              }
            />
            <UserDetailsContainer>
              <Username>{currentUser?.username}</Username>
              <Email>{currentUser?.email}</Email>
            </UserDetailsContainer>
          </UserDetails>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            onClick={handleMenuToggle}
          >
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Button>
                <PersonIcon />
                Sign In
              </Button>
            </Login>
          </Link>
        )}
        <Hr />
        <Item>
          <LibraryMusicIcon />
          Library
        </Item>
        <Item>
          <MovieIcon />
          Movies
        </Item>
        <Item>
          <ArticleIcon />
          Articles
        </Item>
        <Item>
          <LiveTvIcon />
          Live TV
        </Item>
        <Hr />
        <Item>
          <AccountCircleIcon />
          Account
        </Item>
        <Item>
          <SettingsIcon />
          Settings
        </Item>
        <Item>
          <FlagIcon />
          Report
        </Item>
        <Item>
          <HelpIcon />
          Help
        </Item>
        <Item>
          <FeedbackIcon />
          Feedback
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Menu;
