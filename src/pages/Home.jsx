/* eslint-disable react/prop-types */
import styled from "styled-components";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1px;
`;

function Home({ type }) {
  const API = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getRandomVideos = async () => {
      try {
        const res = await axios.get(`
          ${API}/api/videos/${type}
        `);
        setVideos(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRandomVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  console.log(type);
  console.log(videos);
  console.log(type);

  return (
    <Container>
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
