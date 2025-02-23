import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useScreen } from "../context/ScreenContext";
import { DEFAULT_PROFILE_PIC } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import {
  videoFetchStart,
  videoFetchSuccess,
  videoFetchFailure,
  like,
  videosFetchSuccess,
  videosFetchFailure,
  videosFetchStart,
  dislike,
} from "../redux/videoSlice";
import {
  subSuccess,
  subFailure,
  subStart,
  unsubStart,
  unsubSuccess,
} from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  gap: ${({ isMobile }) => (isMobile ? "0" : "24px")};
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  background-color: ${({ isMobile, theme }) => isMobile && theme.bg};
  padding: ${({ isMobile }) => (isMobile ? "10px" : "0")};
`;

const Content = styled.div`
  padding: ${({ isMobile }) => (isMobile ? "0" : "15px")};
  flex: 5;
  width: 100%;
`;

const Title = styled.h1`
  font-size: ${({ isMobile }) => (isMobile ? "18px" : "24px")};
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: ${({ isMobile }) => (isMobile ? "10px" : "0")};
  margin-top: ${({ isMobile }) => (isMobile ? "10px" : "0")};
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: ${({ isMobile }) => (isMobile ? "12px" : "14px")};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ isMobile }) => (isMobile ? "10px" : "20px")};
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
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
  font-size: ${({ isMobile }) => (isMobile ? "15px" : "18px")};
`;

const Recommendation = styled.div`
  flex: 2;
  margin-top: ${({ isMobile }) => (isMobile ? "20px" : "0")};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: ${({ isMobile }) => (isMobile ? "10px" : "0")};
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ isMobile }) => (isMobile ? "10px" : "20px")};
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const Image = styled.img`
  height: ${({ isMobile }) => (isMobile ? "40px" : "50px")};
  width: ${({ isMobile }) => (isMobile ? "40px" : "50px")};
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isMobile }) => (isMobile ? "center" : "flex-start")};
  gap: ${({ isMobile }) => (isMobile ? "5px" : "10px")};
`;

const ChannelName = styled.span`
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: ${({ isMobile }) => (isMobile ? "12px" : "14px")};
`;

const ChannelDescription = styled.p`
  font-size: ${({ isMobile }) => (isMobile ? "12px" : "14px")};
  color: ${({ theme }) => theme.textSoft};
  text-align: ${({ isMobile }) => (isMobile ? "center" : "left")};
`;

const Subscribe = styled.button`
  outline: none;
  border: none;
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  padding: ${({ isMobile }) => (isMobile ? "8px 16px" : "10px 20px")};
  border-radius: 20px;
  cursor: pointer;
  font-size: ${({ isMobile }) => (isMobile ? "12px" : "14px")};
`;

const VideoWrapper = styled.div`
  width: 100%;
  margin-top: ${({ isMobile }) => (isMobile ? "10px" : "0")};
`;

const StyledVideo = styled.video`
  width: 100%;
  height: ${({ isMobile }) => (isMobile ? " 350px" : "500px")};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

const Loading = styled.div`
  color: ${({ theme }) => theme.textSoft};
  font-size: 18px;
  margin-top: 5px;
  text-align: center;
`;

function Video() {
  const { isMobile } = useScreen();
  const API = import.meta.env.VITE_API_URL;
  const { videoId: currentVideoId } = useParams();
  const dispatch = useDispatch();

  // Redux state
  const {
    video,
    loading: videoLoading,
    error: videoError,
    videos,
  } = useSelector((state) => state.video);
  const {
    user: currentUser,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  // Fetch video data
  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(videosFetchStart());

      try {
        const res = await axios.get(`${API}/api/videos/trends`);
        dispatch(videosFetchSuccess(res.data));
      } catch (error) {
        dispatch(videosFetchFailure());
        console.log(error);
      }
    };

    fetchVideos();
  }, [dispatch, currentVideoId, API]);

  useEffect(() => {
    const fetchVideoData = async () => {
      dispatch(videoFetchStart());

      try {
        const res = await axios.get(`${API}/api/videos/find/${currentVideoId}`);
        dispatch(videoFetchSuccess(res.data));
      } catch (error) {
        dispatch(videoFetchFailure());
        console.log(error);
      }
    };

    fetchVideoData();
  }, [dispatch, currentVideoId, API]);

  // Fetch user data (channel owner)
  useEffect(() => {
    if (video?.userId) {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(`${API}/api/users/find/${video.userId}`);
          setUser(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserData();
    }
  }, [dispatch, video?.userId, API]);

  // Handle like functionality
  const handleLike = async () => {
    if (!currentUser) return;

    try {
      await axios.put(`${API}/api/users/like/${video?._id}`, {
        userId: currentUser?._id,
      });
      dispatch(like(currentUser?._id));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to like the video", error);
    }
  };

  // Handle dislike functionality
  const handleDislike = async () => {
    if (!currentUser) return;

    try {
      await axios.put(`${API}/api/users/dislike/${video?._id}`, {
        userId: currentUser?._id,
      });
      dispatch(dislike(currentUser?._id));
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Failed to dislike the video", error);
    }
  };

  // Handle subscribe functionality
  const subscribeToVideo = async () => {
    if (!currentUser || !user) return;

    try {
      const subscribed = currentUser?.subscribedUsers.includes(user?._id);

      if (!subscribed) {
        // Subscribe to the channel
        dispatch(subStart()); // Start loading
        await axios.put(`${API}/api/users/sub/${user?._id}`, {
          userId: currentUser?._id,
        });
        dispatch(subSuccess({ userId: user?._id })); // Update Redux state
      } else {
        // Unsubscribe from the channel
        dispatch(unsubStart()); // Start loading
        await axios.put(`${API}/api/users/unsub/${user?._id}`, {
          userId: currentUser?._id,
        });
        dispatch(unsubSuccess({ userId: user?._id })); // Update Redux state
      }
    } catch (error) {
      console.error("Failed to subscribe/unsubscribe", error);
      dispatch(subFailure()); // Handle error
    }
  };

  return (
    <Container isMobile={isMobile}>
      <Content isMobile={isMobile}>
        <VideoWrapper isMobile={isMobile}>
          <StyledVideo
            controls
            autoPlay
            isMobile={isMobile}
            src={video?.VideoUrl}
          />
        </VideoWrapper>
        {(videoError || userError) && (
          <ErrorMessage>{videoError || userError}</ErrorMessage>
        )}
        <Title isMobile={isMobile}>{video?.title}</Title>
        <Details isMobile={isMobile}>
          <Info isMobile={isMobile}>
            {video?.views} views •
            {formatDistanceToNow(new Date(video?.createdAt || Date.now()), {
              addSuffix: true,
            })
              .replace("about ", "")
              .replace("less than a minute ago", "just now")}
          </Info>
          <ButtonContainer isMobile={isMobile}>
            <Button isMobile={isMobile} onClick={handleLike}>
              {video?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon fontSize="inherit" />
              ) : (
                <ThumbUpAltOutlinedIcon fontSize="inherit" />
              )}
              {video?.likes?.length}
            </Button>
            <Button isMobile={isMobile} onClick={handleDislike}>
              {video?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon fontSize="inherit" />
              ) : (
                <ThumbDownAltOutlinedIcon fontSize="inherit" />
              )}
              {video?.dislikes?.length}
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
        <Channel isMobile={isMobile}>
          <ChannelInfo isMobile={isMobile}>
            {userLoading && <Loading>Loading...</Loading>}
            <div style={{ display: "flex", gap: "10px" }}>
              <Image
                isMobile={isMobile}
                src={user?.profilePic ? user?.profilePic : DEFAULT_PROFILE_PIC}
              />
              <ChannelDetail isMobile={isMobile}>
                <ChannelName isMobile={isMobile}>{user?.username}</ChannelName>
                <ChannelCounter isMobile={isMobile}>
                  {user?.subscribers} Subscribers
                </ChannelCounter>
                <ChannelDescription isMobile={isMobile}>
                  {video?.desc}
                </ChannelDescription>
              </ChannelDetail>
            </div>
            <Subscribe isMobile={isMobile} onClick={subscribeToVideo}>
              {currentUser?.subscribedUsers?.includes(user?._id)
                ? "UNSUBSCRIBE"
                : "SUBSCRIBE"}
            </Subscribe>
          </ChannelInfo>
        </Channel>
        <Hr />
        <Comments currentVideoId={currentVideoId} />
      </Content>
      <Recommendation isMobile={isMobile}>
        {videoLoading && <Loading>Loading...</Loading>}
        {videos?.map((video) => {
          if (video.userId === currentUser?._id) return;
          return (
            <Card
              key={video?._id}
              src={video?.VideoUrl}
              imgSrc={video?.imgUrl}
              views={video?.views}
              date={video?.createdAt}
              title={video?.title}
              userId={video?.userId}
              videoId={video?._id}
              type="sm"
            />
          );
        })}
      </Recommendation>
    </Container>
  );
}

export default Video;
