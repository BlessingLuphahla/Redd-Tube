/* eslint-disable react/prop-types */
import { Link } from "react-router";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import axios from "axios";
import { DEFAULT_PROFILE_PIC, DEFAULT_VIDEO_IMAGE } from "../utils/constants";

const Container = styled.div`
  cursor: pointer;
  width: ${(props) => props.type !== "sm" && "100%"};
  display: ${(props) => props.type === "sm" && "flex"};
  margin-top: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  justify-content: center;
  padding: 5px;
`;

const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "50%" : "100%")};
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  flex: ${(props) => props.type === "sm" && "1"};
  background-color: #999;
`;

const Details = styled.div`
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  flex-direction: ${(props) => props.type === "sm" && "column"};
  margin-left: ${(props) => props.type === "sm" && "15px"};
  flex: ${(props) => props.type === "sm" && "1"};
  display: flex;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  height: ${(props) => props.type === "sm" && "100%"};
  justify-content: ${(props) => props.type === "sm" && "center"};
  flex-direction: column;
  display: flex;
  gap: 5px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

function Card({ src, type, views, date, title, userId,videoId }) {
  const API = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState({});

  const createdAt = new Date(date);
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`
        ${API}/api/users/find/${userId}
      `);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <Link to={`video/${videoId}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={src ? src : DEFAULT_VIDEO_IMAGE} />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={user?.profilePic ? user?.profilePic : DEFAULT_PROFILE_PIC}
          />
          <Texts type={type}>
            <Title>{title}</Title>
            <ChannelName>{user?.username}</ChannelName>
            <Info>
              {views} views • {formattedDate.replace("about ", "")}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
