import styled from "styled-components";

const Container = styled.div``;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

function Comment({ text, image }) {
  return (
    <Container>
      <Avatar src={image} />
      <div>{text}</div>
    </Container>
  );
}

export default Comment;
