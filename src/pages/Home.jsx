import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1px;
`;

const dummyShit = [];

for (let i = 1; i < 200; i++) dummyShit.push(i * 23);

function Home() {
  return (
    <Container>
      {dummyShit.map((i, index) => {
        return (
          <Card
            src="https://images.pexels.com/photos/13246022/pexels-photo-13246022.jpeg?auto=compress&cs=tinysrgb&w=600"
            key={index}
            data={i}
          />
        );
      })}
    </Container>
  );
}

export default Home;
