import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useScreen } from "../context/ScreenContext";

const dummyShit = [];

for (let i = 1; i < 10; i++) dummyShit.push(i * 23);

const Container = styled.div`
  display: flex;

  // media queries
  gap: ${({ isMobile }) => !isMobile && "24px"};
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  position: ${({ isMobile }) => isMobile && "absolute"};
  right: ${({ isMobile }) => isMobile && 0};
  left: ${({ isMobile }) => isMobile && 0};
  top: ${({ isMobile }) => isMobile && "100px"};
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
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  color: ${({ theme }) => theme.text};
  flex-direction: ${({ isMobile }) => isMobile && "column"};
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
  justify-content: space-between;
  gap: 20px;
  flex-direction: ${({ isMobile }) => isMobile && "column"};
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
`;

const Subscribe = styled.button`
  outline: none;
  border: none;
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  width: 100px;
  height: 45px;
  border-radius: 20px;
  cursor: pointer;
`;

const VideoWrapper = styled.div``;

function Video() {
  const { isMobile } = useScreen();

  return (
    <Container isMobile={isMobile}>
      <Content isMobile={isMobile}>
        <VideoWrapper isMobile={isMobile}>
          <iframe
            width={!isMobile && "100%"}
            height={!isMobile && "520"}
            src="https://www.youtube.com/embed/M2WWYcVKvSc"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>Test Video</Title>
        <Details isMobile={isMobile}>
          <Info>234, 121, 121 views • Jan 22, 2025</Info>
          <ButtonContainer>
            <Button>
              <ThumbUpAltOutlinedIcon /> 123
            </Button>
            <Button>
              <ThumbDownAltOutlinedIcon /> Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </ButtonContainer>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src="https://images.pexels.com/photos/30243611/pexels-photo-30243611/free-photo-of-cozy-minimalist-interior-with-beige-sofa.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
            <ChannelDetail>
              <ChannelName>REDD AXE</ChannelName>
              <ChannelCounter>200K Subscribers</ChannelCounter>
              <ChannelDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Dolorum perspiciatis excepturi ea, doloremque enim!
              </ChannelDescription>
            </ChannelDetail>
            <Subscribe>SUBSCRIBE</Subscribe>
          </ChannelInfo>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        {dummyShit.map((i, index) => {
          return (
            <Card
              src="https://images.pexels.com/photos/30337253/pexels-photo-30337253/free-photo-of-footprints-in-sand-on-casablanca-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              type="sm"
              key={index}
              data={i}
            />
          );
        })}
      </Recommendation>
    </Container>
  );
}

export default Video;
