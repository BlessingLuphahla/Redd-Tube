/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useScreen } from "../context/ScreenContext";
import { useEffect, useState } from "react";
import { DEFAULT_PROFILE_PIC } from "../utils/constants";
import axios from "axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0px;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span`
  display: flex;
  gap: 10px;
  font-weight: 500;
  font-size: ${({ isMobile }) => (isMobile ? "9px" : "13px")};
`;

const Date = styled.span`
  font-size: ${({ isMobile }) => (isMobile ? "6px" : "10px")};
  color: ${({ theme }) => theme.textSoft};
`;

const Text = styled.span`
  font-size: ${({ isMobile }) => (isMobile ? "9px" : "13px")};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Comment({ text, date, userId }) {
  const { isMobile } = useScreen();

  const [commentUser, setCommentUser] = useState();
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getCommentUser = async () => {
      try {
        const res = await axios.get(`
        ${API}/api/users/find/${userId}
      `);
        setCommentUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCommentUser();
  }, []);

  return (
    <Container>
      <Avatar
        src={
          commentUser?.profilePic
            ? commentUser?.profilePic
            : DEFAULT_PROFILE_PIC
        }
      />
      <Details isMobile={isMobile}>
        <Name isMobile={isMobile}>
          {commentUser?.username}
          <Date isMobile={isMobile}>{date}</Date>
        </Name>
        <Text isMobile={isMobile}>{text}</Text>
      </Details>
    </Container>
  );
}

export default Comment;
