import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSignUpDto } from '../models/userDtos';
import { signUpWithEmailAndPassword } from '../services/firebaseAuthServices';
import Swal from 'sweetalert2';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://bipinsubedi1.com.np" target="_blank" rel="noopener noreferrer">
                Bipin Subedi
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUpForm() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password != rePassword) {
            setIsValid(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Password does not match with the retyped password. Please try again",
                timerProgressBar: true,
                timer: 2000,
                showConfirmButton: true
            })
            return;
        }

        setIsValid(true);

        if (isValid) {
            const credentials: UserSignUpDto = {
                displayName: fullName,
                email: email,
                password: password,
            }

            try {
                await signUpWithEmailAndPassword(credentials);
                navigate("/login");
            } catch (error) {
                console.log("Error logging in: " + error);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSignUp} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            id="fullName"
                            label="Full Name"
                            autoComplete="fullName"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="rePassword"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            label="Retype Password"
                            type="password"
                            id="rePassword"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}