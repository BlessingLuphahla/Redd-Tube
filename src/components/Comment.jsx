import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.span``;

const Date = styled.span``;

const Text = styled.span``;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Comment({ text, image, date, name }) {
  return (
    <Container>
      <Avatar src="https://images.pexels.com/photos/30474533/pexels-photo-30474533/free-photo-of-rustic-italian-architecture-with-terra-cotta-rooftops.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
      <Details>
        <Name>{name}</Name>
        <Date>{date}</Date>
        <Text>{text}</Text>
      </Details>
    </Container>
  );
}

export default Comment;
