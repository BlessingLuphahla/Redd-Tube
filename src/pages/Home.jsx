/* eslint-disable react/prop-types */
import styled from "styled-components";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useScreen } from "../context/ScreenContext";
import CircularProgress from "@mui/material/CircularProgress";

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

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  z-index: 1000; /* Ensure it's above other content */
`;

function Home({ type }) {
  const API = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { isMobile } = useScreen();

  useEffect(() => {
    const getRandomVideos = async () => {
      try {
        // Artificial delay for testing (2 seconds)
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await axios.get(`${API}/api/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    getRandomVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <CircularProgress size={60} color="primary" /> {/* Loading spinner */}
        </LoadingOverlay>
      )}
      <Container>
        <Search isMobile={isMobile}>
          <Input isMobile={isMobile} placeholder="Search" />
          <SearchIcon />
        </Search>
        {videos?.map((video, index) => (
          <Card
            key={video._id + index}
            imgSrc={video.imgUrl}
            views={video.views}
            date={video.createdAt}
            title={video.title}
            userId={video.userId}
            videoId={video._id}
          />
        ))}
      </Container>
    </>
  );
}

export default Home;
