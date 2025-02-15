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
        return <Card key={index} data={i} />;
      })}
    </Container>
  );
}

export default Home;
