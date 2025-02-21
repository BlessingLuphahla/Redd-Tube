import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useScreen } from "../context/ScreenContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_PROFILE_PIC } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";

import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: ${({ isMobile }) => (isMobile ? "0" : "24px")};
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  background-color: ${({ isMobile, theme }) => isMobile && theme.bg};
`;

const Content = styled.div`
  flex: 5;

  //media queires
  display: ${({ isMobile }) => isMobile && "flex"};
  flex-direction: ${({ isMobile }) => isMobile && "column"};
  align-items: ${({ isMobile }) => isMobile && "center"};
  justify-content: ${({ isMobile }) => isMobile && "center"};
`;

const Title = styled.h1`
  font-size: ${({ isMobile }) => (isMobile ? "12px" : "18px")};
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ isMobile }) => isMobile && "column"};
  flex-wrap: ${({ isMobile }) => isMobile && "wrap"};
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: ${({ isMobile }) => isMobile && "13px"};
`;

const ButtonContainer = styled.div`
  flex-direction: ${({ isMobile }) => isMobile && "column"};
  padding: ${({ isMobile }) => !isMobile && "10px"};
  color: ${({ theme }) => theme.text};
  display: flex;
  gap: 20px;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Button = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  font-size: ${({ isMobile }) => isMobile && "13px"};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isMobile }) => isMobile && "column"};
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;

  // media queries
  flex-direction: ${({ isMobile }) => isMobile && "column"};
  align-items: ${({ isMobile }) => isMobile && "center"};
  justify-content: ${({ isMobile }) => (isMobile ? "center" : "space-between")};
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};

  // media queries
  align-items: ${({ isMobile }) => isMobile && "center"};
  justify-content: ${({ isMobile }) => isMobile && "center"};
`;

const ChannelName = styled.span`
  font-size: ${({ isMobile }) => (isMobile ? "10px" : "16px")};
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: ${({ isMobile }) => (isMobile ? "9px" : "12px")};
`;

const ChannelDescription = styled.p`
  font-size: ${({ isMobile }) => (isMobile ? "10px" : "14px")};
  width: ${({ isMobile }) => isMobile && "90%"};
`;

const Subscribe = styled.button`
  outline: none;
  border: none;
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  width: ${({ isMobile }) => (isMobile ? "100px" : "100px")};
  height: ${({ isMobile }) => (isMobile ? "35px" : "45px")};
  font-size: ${({ isMobile }) => isMobile && "14px"};
  border-radius: 20px;
  cursor: pointer;
`;

const VideoWrapper = styled.div`
  margin-top: ${({ isMobile }) => isMobile && "20px"};
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

function Video() {
  const { isMobile } = useScreen();

  const API = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);

  const { videoId: currentVideoId } = useParams();

  const [currentVideo, setCurrentVideo] = useState({});

  const [videoUser, setVideoUser] = useState({});

  const [videoUserId, setVideoUserId] = useState("");

  useEffect(() => {
    const getTrends = async () => {
      try {
        const res = await axios.get(`
          ${API}/api/videos/trends
        `);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTrends();
  }, [API]);

  useEffect(() => {
    const getCurrentVideo = async () => {
      try {
        const res = await axios.get(`
          ${API}/api/videos/find/${currentVideoId}
        `);
        setCurrentVideo(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentVideo();
  }, [API, currentVideoId]);

  useEffect(() => {
    if (currentVideo) setVideoUserId(currentVideo?.userId);
    else return;
  }, [currentVideo]);

  useEffect(() => {
    const getUser = async () => {
      if (!videoUserId) return;

      try {
        const res = await axios.get(`
        ${API}/api/users/find/${videoUserId}
      `);
        setVideoUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [API, videoUserId]);

  return (
    <Container isMobile={isMobile}>
      <Content isMobile={isMobile}>
        <VideoWrapper isMobile={isMobile}>
          <StyledVideo
            controls
            autoPlay
            isMobile={isMobile}
            src={currentVideo?.VideoUrl}
          />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details isMobile={isMobile}>
          <Info isMobile={isMobile}>
            {currentVideo?.views} views •
            {formatDistanceToNow(
              new Date(currentVideo?.createdAt || Date.now()),
              {
                addSuffix: true,
              }
            )
              .replace("about ", "")
              .replace("less than a minute ago", "just now")}
          </Info>
          <ButtonContainer>
            <Button isMobile={isMobile}>
              <ThumbUpAltOutlinedIcon fontSize="inherit" />{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button isMobile={isMobile}>
              <ThumbDownAltOutlinedIcon fontSize="inherit" />{" "}
              {currentVideo?.dislikes?.length}
            </Button>
            <Button isMobile={isMobile}>
              <ReplyOutlinedIcon fontSize="inherit" /> Share
            </Button>
            <Button isMobile={isMobile}>
              <AddTaskOutlinedIcon fontSize="inherit" /> Save
            </Button>
          </ButtonContainer>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo isMobile={isMobile}>
            <Image
              src={
                videoUser?.profilePic
                  ? videoUser?.profilePic
                  : DEFAULT_PROFILE_PIC
              }
            />
            <ChannelDetail isMobile={isMobile}>
              <ChannelName isMobile={isMobile}>
                {videoUser?.username}
              </ChannelName>
              <ChannelCounter isMobile={isMobile}>
                {videoUser?.subscribers} Subscribers
              </ChannelCounter>
              <ChannelDescription isMobile={isMobile}>
                {currentVideo?.desc}
              </ChannelDescription>
            </ChannelDetail>
            <Subscribe isMobile={isMobile}>SUBSCRIBE</Subscribe>
          </ChannelInfo>
        </Channel>
        <Hr />
        <Comments currentVideoId={currentVideoId} />
      </Content>
      <Recommendation>
        {videos?.map((video, index) => {
          return (
            <Card
              key={video._id + index}
              src={video.videoUrl}
              views={video.views}
              date={video.createdAt}
              title={video.title}
              userId={video.userId}
            />
          );
        })}
      </Recommendation>
    </Container>
  );
}

export default Video;
