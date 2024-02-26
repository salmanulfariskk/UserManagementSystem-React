import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../../redux/slices/userSlice';
import { setUsername as setUserDisplayName } from '../../../redux/slices/userSlice';
import { setLoggedIn as setAdminLoggedIn } from '../../../redux/slices/adminSlice';
import { setUsername as setAdmiDisplayName } from '../../../redux/slices/adminSlice';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser } from '../../../services/api';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="">
                StylesCraze
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

const defaultTheme = createTheme();

export default function Login({ role }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // errors
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function validateUsername(username) {
        if (username) {
            if (username.length < 4) {
                return "Username must be atleast 4 characters long";
            }
        } else {
            return "Username is required";
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
        setPasswordError(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearErrors();

        // validations
        const isUsernameValid = validateUsername(username);
        const isPasswordValid = validatePassword(password);
        // Update error states
        isUsernameValid && setUsernameError(isUsernameValid);
        isPasswordValid && setPasswordError(isPasswordValid);

        if (!isUsernameValid && !isPasswordValid) {
            try { 
                const response = await loginUser({ username, password, role });

                if (response) {
                    if (response.data.status === "success") {
                        // Handle the successful signin response
                        if (role === 'user') {
                            dispatch(setLoggedIn(true));
                            dispatch(setUserDisplayName(username));
                            navigate('/');
                        } else {
                            dispatch(setAdminLoggedIn(true));
                            dispatch(setAdmiDisplayName(username));
                            navigate('/admin');
                        }
                    } else {
                        alert(response.data.message);
                        console.log(response);
                    }
                }
            } catch (error) {
                // Handle errors from the signin request
                alert('Signin failed');
                console.error(error);
            }
        }
    };

    return (
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
                    <Avatar sx={{ m: 1, bgcolor: '#1e1e2f' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={Boolean(passwordError)}
                            helperText={passwordError && passwordError}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {role === 'user' &&
                            <Grid container>
                                <Grid item>
                                    <RouterLink to="/sign-up" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </RouterLink>
                                </Grid>
                            </Grid>
                        }
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
};