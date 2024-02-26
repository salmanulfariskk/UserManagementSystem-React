import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Header from '../../partials/header/Header';
import { editProfile } from '../../../services/api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const displayName = useSelector(state => state.user.username);
  const currentUser = useSelector(state => state.user.currentUser);

  const [newProfile, setNewProfile] = useState(null);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [currentProfile, setCurrentProfile] = useState(currentUser.profile);

  // errors
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  function validateUsername(username) {
    if (username) {
      if (username.length < 4) {
        return "Username must be atleast 4 characters long";
      }
    } else {
      return "Username is required";
    }
  };

  function validateEmail(email) {
    if (email) {
      if (!email.includes('@') || !email.includes('.')) {
        return "Enter a valid email";
      }
    } else {
      return "Email is required";
    }
  };

  function validatePhone(phone) {
    if (phone) {
      if (!/^\d{10}$/.test(phone)) {
        return "Enter a valid phone number";
      }
    } else {
      return "Phone number is required";
    }
  };

  function clearErrors() {
    setUsernameError(false);
    setEmailError(false);
    setPhoneError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();

    // validations
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);

    // Update error states
    isUsernameValid && setUsernameError(isUsernameValid);
    isEmailValid && setEmailError(isEmailValid);
    isPhoneValid && setPhoneError(isPhoneValid);

    if (!isUsernameValid && !isEmailValid && !isPhoneValid) {
      try {
        let formData;
        if (newProfile) {
          formData = new FormData();
          formData.append('username', username);
          formData.append('email', email);
          formData.append('phone', phone);
          formData.append('profile', newProfile);
        } else {
          formData = {
            username,
            email,
            phone
          };
        }
        const response = await editProfile(formData, newProfile?.size);
        // Handle the successful signup response
        if (response) {
          if (response.data.status === "success") {
            navigate("/");
          } else {
            alert(response.data.message);
          }
        }
      } catch (error) {
        // Handle errors from the signup request
        alert('Editing profile failed');
        console.error('Editing profile failed', error);
      }
    }
  };

  return (
    <>
      <Header user={displayName} role={'user'} />
      <div className='profile-main-div'>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px'
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {newProfile && (
            <img
              src={URL.createObjectURL(newProfile)}
              alt="profile"
            />
          )}
          {(currentProfile && !newProfile) && (
            <img
              src={`http://localhost:3000//${currentProfile}`}
              alt="profile"
            />
          )}
          <CloudUploadIcon />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProfile(e.target.files[0])}
          />
          <TextField
            id="filled-basic"
            label="Username"
            variant="filled"
            value={username}
            error={Boolean(usernameError)}
            helperText={usernameError && usernameError}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Phone"
            variant="filled"
            type="number"
            value={phone}
            error={Boolean(phoneError)}
            helperText={phoneError && phoneError}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            value={email}
            error={Boolean(emailError)}
            helperText={emailError && emailError}
            onChange={(e) => setEmail(e.target.value)}
          />
          {(username !== currentUser.username || phone !== currentUser.phone || email !== currentUser.email || newProfile) &&
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          }
        </Box>
      </div>
    </>
  );
};

export default Profile;
