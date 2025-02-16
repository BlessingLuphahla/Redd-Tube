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
import { Link } from "react-router";

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
  display: flex;
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

function Menu({ setTheme, theme }) {
  const handleSetTheme = () => {
    if (theme === LightTheme) setTheme(DarkTheme);
    else setTheme(LightTheme);
  };

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            <Img src={LogoImg} alt="logo" />
            Axe-Media
          </Logo>
        </Link>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <Item>
          <ExploreIcon />
          Explore
        </Item>
        <Item>
          <SubscriptionsIcon />
          Subscriptions
        </Item>
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
        <Login>
          Sign in to like videos, comment, and subscribe.
          <Button>
            <PersonIcon />
            Sign In
          </Button>
        </Login>
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
