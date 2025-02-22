import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { styled as styledMaterial } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const StyledCircularProgress = styledMaterial(CircularProgress)(
  ({ theme }) => ({
    color: theme.palette.primary.main, // Use theme colors
    margin: "0 auto", // Center the spinner
  })
);

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
  min-height: 300px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FileInputLabel = styled.label`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const FileInput = styled.input`
  display: none; // Hide the actual file input
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.soft};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1300;
  text-align: center;
  font-size: 18px;
  max-width: 90%;
  width: 300px;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: ${({ theme }) => theme.soft};
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: #00ff00;
  transition: width 0.3s ease;
`;

// eslint-disable-next-line react/prop-types
function Upload({ setPopupIsOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const navigator = useNavigate();

  const { user: currentUser } = useSelector((state) => state.user);
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setUploadProgress(0);

    // Validate inputs
    if (!title || !description || !videoFile || !thumbnailFile) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (!videoFile.type.startsWith("video/")) {
      setError("Please upload a valid video file.");
      setIsLoading(false);
      return;
    }

    if (!thumbnailFile.type.startsWith("image/")) {
      setError("Please upload a valid image file for the thumbnail.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          const weightedProgress = Math.round(percentCompleted * 0.8);
          setUploadProgress(weightedProgress);
        },
      });

      const { thumbnailUrl, videoUrl } = uploadResponse.data;

      await axios.post(`${API}/api/videos`, {
        userId: currentUser?._id,
        title,
        desc: description,
        imgUrl: thumbnailUrl,
        VideoUrl: videoUrl,
        tags: tags.split(","),
      });

      setUploadProgress(100);
      setSuccessMessage("Upload successful! Your video is now live.");
      setTimeout(() => {
        setSuccessMessage("");
        setPopupIsOpen(false);
      }, 3000);

      navigator("/");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setPopupIsOpen(false);
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
            type="text"
            placeholder="Put tags here seperated by commas (optional)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <FileInputLabel htmlFor="video-upload">
            {videoFile ? videoFile.name : "Upload Video"}
          </FileInputLabel>

          <FileInput
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          />
          <FileInputLabel htmlFor="thumbnail-upload">
            {thumbnailFile ? thumbnailFile.name : "Upload Thumbnail"}
          </FileInputLabel>
          <FileInput
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {isLoading && (
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <ProgressBar>
                <Progress progress={uploadProgress} />
              </ProgressBar>
              <div>{uploadProgress}%</div>
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <StyledCircularProgress size={24} /> : "Upload"}
          </Button>
        </Form>
      </Wrapper>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </Container>
  );
}

export default Upload;
