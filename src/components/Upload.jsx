import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 1200;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  &:hover {
    color: ${({ theme }) => theme.soft};
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  resize: vertical;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  color: ${({ theme }) => theme.bg};
  background-color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

function Upload({ setPopupIsOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle video upload logic here
    console.log({ title, description, file });
    setPopupIsOpen(false); // Close the modal after submission
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setPopupIsOpen(false); // Close the modal when clicking outside
    }
  };

  return (
    <Container onClick={handleOverlayClick}>
      <Wrapper>
        <Close onClick={() => setPopupIsOpen(false)} aria-label="Close modal">
          &times;
        </Close>
        <Title>Upload A New Video</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Video Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <Button type="submit">Upload</Button>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Upload;
