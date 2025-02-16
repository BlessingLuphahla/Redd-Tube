/* eslint-disable react/prop-types */
import { Link } from "react-router";
import styled from "styled-components";

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

function Card({ data, src, type }) {
  return (
    <Link to="video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={src} />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://images.pexels.com/photos/17089904/pexels-photo-17089904/free-photo-of-table-with-wineglasses.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <Texts type={type}>
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
