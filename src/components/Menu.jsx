import styled from "styled-components";
import LogoImg from "../assets/images/logo.jpg";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleIcon from "@mui/icons-material/Article";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";

const Container = styled.div`
  flex: 1;
  background-color: #202020;
  height: 100vh;
  padding: 0;
  margin: 0;
  color: white;
`;

const Wrapper = styled.div`
  padding: 18px 28px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
  margin-left: 15px;
`;

const Img = styled.img`
  height: 55px;
  width: 55px;
`;

const Item = styled.div`
  display: flex;
  align-items: centre;
  gap: 10px;
  cursor: pointer;
  padding: 7.5px;
`;

function Menu() {
  return (
    <Container>
      <Wrapper>
        <Logo>
          <Img src={LogoImg} alt="logo" />
          Axe Media
        </Logo>
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
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Item>
          <LibraryMusicIcon />
          Library
        </Item>
        <Item>
          <SportsEsportsIcon />
          Sports
        </Item>
        <Item>
          <SportsBaseballIcon />
          Baseball
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
