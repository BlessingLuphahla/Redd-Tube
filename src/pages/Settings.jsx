import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSettingsStart,
  updateSettingsSuccess,
  updateSettingsFailure,
  logout,
} from "../redux/userSlice";
import { DEFAULT_PROFILE_PIC } from "../utils/constants";
import CircularProgress from "@mui/material/CircularProgress";
import { useScreen } from "../context/ScreenContext.jsx";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding-bottom: ${({ isMobile }) => (isMobile ? "45vh" : "40px")};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.soft};
`;

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.bg};
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:disabled {
    background-color: ${({ theme }) => theme.soft};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: #00ff00;
  margin-top: 10px;
`;

function Settings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [username, setUsername] = useState(user?.username || "");
  const [profilePic, setProfilePic] = useState(
    user?.profilePic || DEFAULT_PROFILE_PIC
  );
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { isMobile } = useScreen();
  const API = import.meta.env.VITE_API_URL;

  const handleUpdateSettings = async () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    dispatch(updateSettingsStart());
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const updatedFields = {};

      if (username !== user.username) {
        updatedFields.username = username;
      }

      if (password && password.trim() !== "") {
        updatedFields.password = password;
      }

      if (profilePic !== user.profilePic) {
        updatedFields.profilePic = profilePic;
      }

      // Update the backend
      const res = await axios.put(
        `${API}/api/users/${user._id}`,
        updatedFields
      );
      console.log(res.data);

      // Update Redux state
      dispatch(updateSettingsSuccess(updatedFields));
      setSuccess("Settings updated successfully!");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update settings.");
      dispatch(updateSettingsFailure());
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);

      const res = await axios.post(`${API}/upload-profile-pic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = res.data;
      console.log(data);

      // Update Redux state
      dispatch(updateSettingsSuccess({ profilePic: data.url }));
      setProfilePic(data.url);
      setSuccess("Profile picture updated successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container isMobile={isMobile}>
      <Title>Settings</Title>
      <label htmlFor="profile-pic-upload">
        <ProfilePic src={profilePic} alt="Profile Picture" />
      </label>
      <input
        id="profile-pic-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleProfilePicChange}
      />
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button onClick={handleUpdateSettings} disabled={isLoading}>
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          "Update Settings"
        )}
      </Button>
      <Button onClick={handleLogout} style={{ backgroundColor: "#ff4444" }}>
        Logout
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </Container>
  );
}

export default Settings;
