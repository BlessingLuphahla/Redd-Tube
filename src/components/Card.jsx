/* eslint-disable react/prop-types */
import { Link } from "react-router";
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
  color: ${({ theme }) => theme.textSoft};
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text};
`;

function Card({ data }) {
  return (
    <Link to="video/test" style={{ textDecoration: "none" }}>
      <Container>
        <Image src="https://images.pexels.com/photos/13246022/pexels-photo-13246022.jpeg?auto=compress&cs=tinysrgb&w=600" />
        <Details>
          <ChannelImage src="https://images.pexels.com/photos/17089904/pexels-photo-17089904/free-photo-of-table-with-wineglasses.jpeg?auto=compress&cs=tinysrgb&w=600" />
          <Texts>
            <Title>Poison</Title>
            <ChannelName>Redd Axe {data}</ChannelName>
            <Info>660,900 views • 1 day ago </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
