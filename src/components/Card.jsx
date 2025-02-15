/* eslint-disable react/prop-types */
import styled from "styled-components";

const Container = styled.div`
  cursor: pointer;
  width: 360px;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
`;

const Info = styled.div`
  font-size: 12px;
`;

function Card({ data }) {
  return (
    <Container>
      <Image src="https://images.pexels.com/photos/30682216/pexels-photo-30682216/free-photo-of-sunset-view-of-grand-canal-in-venice.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
      <Details>
        <ChannelImage src="https://images.pexels.com/photos/29343550/pexels-photo-29343550/free-photo-of-scenic-mountain-road-in-majestic-forest-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Texts>
          <Title>Poison</Title>
          <ChannelName>Redd Axe {data}</ChannelName>
          <Info>660,900 views • 1 day ago </Info>
        </Texts>
      </Details>
    </Container>
  );
}

export default Card;
