import styled from "styled-components";
import { dummyComments } from "../utils/DummyComments";
import { useScreen } from "../context/ScreenContext";
import Comment from "./Comment";

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

function Comments() {
  const { isMobile } = useScreen();

  return (
    <Container>
      <NewComment isMobile={isMobile}>
        {isMobile && (
          <Avatar src="https://images.pexels.com/photos/30253635/pexels-photo-30253635/free-photo-of-dramatic-sand-dunes-texture-in-algerian-desert.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        )}
        <Input isMobile={isMobile} placeholder="Add a comment" />
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
