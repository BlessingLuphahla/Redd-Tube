/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useScreen } from "../context/ScreenContext";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  font-size: ${({ isMobile }) => (isMobile ? "10px" : "15px")};
  padding: 10px;
  width: 100%;
  margin: 10px 0px;
`;

function Comments({ currentVideoId }) {
  const { isMobile } = useScreen();

  const [comments, setComments] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`
        ${API}/api/comments/${currentVideoId}
      `);
        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getComments();
  }, []);

  return (
    <Container>
      <NewComment isMobile={isMobile}>
        <Avatar src="https://images.pexels.com/photos/30253635/pexels-photo-30253635/free-photo-of-dramatic-sand-dunes-texture-in-algerian-desert.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        #
        <Input isMobile={isMobile} placeholder="Add a comment" />
      </NewComment>
      {comments?.map((comment, index) => {
        console.log(comment);

        return (
          <Comment
            key={comment + index}
            text={comment.text}
            image={comment.image}
            date={comment.date}
            name={comment.name}
          >
            {}
          </Comment>
        );
      })}
    </Container>
  );
}

export default Comments;
