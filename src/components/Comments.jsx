import styled from "styled-components";

const Container = styled.div``;

import { dummyComments } from "../utils/DummyComments";
import Comment from "./Comment";
import { useScreen } from "../context/ScreenContext";

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  padding: 10px;
  width: 100%;
  margin: 10px 0px;
`;

function Comments() {
  const { isMobile } = useScreen();

  return (
    <Container>
      <NewComment>
        <Avatar src="https://images.pexels.com/photos/30415724/pexels-photo-30415724/free-photo-of-chicago-skyline-with-modern-architecture.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        <Input placeholder="Add a comment" />
      </NewComment>
      {dummyComments.map((comment, index) => {
        if (isMobile && index > 4) return;

        console.log(index);
        console.log(typeof index);

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
