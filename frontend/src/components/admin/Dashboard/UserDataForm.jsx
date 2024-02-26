import { useState } from 'react';
import { addUser, editUser } from '../../../services/api';

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UserDataForm = (props) => {
    const navigate = useNavigate();
    const defaultTheme = createTheme();

    const [username, setUsername] = useState(props?.user?.username);
    const [email, setEmail] = useState(props?.user?.email);
    const [phone, setPhone] = useState(props?.user?.phone);
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    // errors
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confPasswordError, setConfPasswordError] = useState(false);

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

    function validatePassword(password) {
        if (password) {
            if (password.length < 8) {
                return "Password must be atleast 8 characters long";
            }
        } else {
            return "Password is required";
        }
    };

    function clearErrors() {
        setUsernameError(false);
        setEmailError(false);
        setPhoneError(false);
        setPasswordError(false);
        setConfPasswordError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearErrors();

        // validations
        const isUsernameValid = validateUsername(username);
        const isEmailValid = validateEmail(email);
        const isPhoneValid = validatePhone(phone);
        const isPasswordValid = validatePassword(password);
        const isConfPasswordValid = password === confPassword;
        // Update error states
        isUsernameValid && setUsernameError(isUsernameValid);
        isEmailValid && setEmailError(isEmailValid);
        isPhoneValid && setPhoneError(isPhoneValid);
        isPasswordValid && setPasswordError(isPasswordValid);
        !isConfPasswordValid && setConfPasswordError(true);

        let everythingValid;
        if (props.user) {
            everythingValid = !isUsernameValid && !isEmailValid && !isPhoneValid;
        } else {
            everythingValid = !isUsernameValid && !isEmailValid && !isPhoneValid && !isPasswordValid && isConfPasswordValid;
        }
        if (everythingValid) {
            try {
                let response;
                if (props.user) {
                    response = await editUser({
                        _id: props.user._id,
                        username,
                        email,
                        phone
                    });
                } else {
                    response = await addUser({
                        username,
                        email,
                        phone,
                        password,
                        confPassword
                    });
                }

                // Handle the successful response
                if (response) {
                    if (response.data.status === "success") {
                        navigate("/admin");
                    } else {
                        alert(response.data.message);
                    }
                }
            } catch (error) {
                // Handle errors from the signup request
                console.error('Signup failed:', error.response.data);
            }
        }
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            {props.todo}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <div className='username-phone-div'>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    error={Boolean(usernameError)}
                                    helperText={usernameError && usernameError}
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="outlined-number"
                                    label="Phone"
                                    type="number"
                                    error={Boolean(phoneError)}
                                    helperText={phoneError && phoneError}
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                            </div>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={Boolean(emailError)}
                                helperText={emailError && emailError}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />{
                                props?.todo === 'Add User' &&
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="password"
                                        error={Boolean(passwordError)}
                                        helperText={passwordError && passwordError}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={props?.user?.username}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm_password"
                                        autoComplete="confirm-password"
                                        error={Boolean(confPasswordError)}
                                        helperText={confPasswordError && 'Confirm Password is required'}
                                        onChange={(e) => setConfPassword(e.target.value)}
                                    />
                                </>
                            }
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {props.todo}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default UserDataForm;