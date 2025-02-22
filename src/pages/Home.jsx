/* eslint-disable react/prop-types */
import styled from "styled-components";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useScreen } from "../context/ScreenContext";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1px;
`;

const Search = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-left: ${({ isMobile }) => (isMobile ? "0" : "20px")};
`;

const Input = styled.input`
  border: none;
  width: ${({ isMobile }) => (isMobile ? "80%" : "92%")};
  padding: 5px;
  background-color: transparent;
  height: ${({ isMobile }) => (isMobile ? "80%" : "100%")};
  font-size: 16px;
  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
    border: none;
  }
`;

function Home({ type }) {
  const API = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const { isMobile } = useScreen();

  useEffect(() => {
    const getRandomVideos = async () => {
      try {
        const res = await axios.get(`
          ${API}/api/videos/${type}
        `);
        setVideos(res.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getRandomVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <Container>
      <Search isMobile={isMobile}>
        <Input isMobile={isMobile} placeholder="Search" />
        <SearchIcon />
      </Search>
      {videos?.map((video, index) => {
        return (
          <Card
            key={video._id + index}
            src={video.videoUrl}
            views={video.views}
            date={video.createdAt}
            title={video.title}
            userId={video.userId}
            videoId={video._id}
          />
        );
      })}
    </Container>
  );
}

export default Home;
