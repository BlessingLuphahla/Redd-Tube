/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useScreen } from "../context/ScreenContext";
import CircularProgress from "@mui/material/CircularProgress";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};

  // media queries
  position: ${({ isMobile }) => isMobile && "absolute"};
  top: 100px;
  left: 0;
  right: 0;
`;

const Search = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg};
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 10px;
  background-color: transparent;
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  text-transform: capitalize;
  text-align: center;
`;

const Message = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-top: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

function Home({ type }) {
  const API = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { isMobile } = useScreen();

  // Fetch videos based on type or search query
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        setError("");

        let endpoint = `${API}/api/videos/${type}`;
        if (searchQuery) {
          endpoint = `${API}/api/videos/search?q=${searchQuery}`;
        }

        const res = await axios.get(endpoint);
        setVideos(res.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch videos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [API, type, searchQuery]);

  // Handle type display
  let displayType = type;
  switch (type.toLowerCase()) {
    case "random":
      displayType = "Welcome";
      break;
    case "subs":
      displayType = "subscriptions";
      break;
    default:
      break;
  }

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <CircularProgress size={60} color="primary" />
        </LoadingOverlay>
      )}

      <Container isMobile={isMobile}>
        <Title>{displayType}</Title>

        {/* Search bar */}
        <Search>
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon />
        </Search>

        {/* Show videos or a message if no videos are available */}
        {error ? (
          <Message>{error}</Message>
        ) : videos.length === 0 && type.toLowerCase() === "subs" ? (
          <Message>You are not subscribed to any channels.</Message>
        ) : videos.length === 0 && searchQuery ? (
          <Message>{`No videos found for ${searchQuery}.`}</Message>
        ) : (
          <CardContainer>
            {videos.map((video, index) => (
              <Card
                key={video?._id + index}
                imgSrc={video?.imgUrl}
                views={video?.views}
                date={video?.createdAt}
                title={video?.title}
                userId={video?.userId}
                videoId={video?._id}
              />
            ))}
          </CardContainer>
        )}
      </Container>
    </>
  );
}

export default Home;
