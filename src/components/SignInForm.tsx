import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider } from '@mui/material';
import GoogleButton from 'react-google-button';
import { loginWithEmailAndPassword, loginWithGoogle } from '../services/firebaseAuthServices';
import { UserSignInDto } from '../models/userDtos';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const defaultTheme = createTheme();

export default function SignInForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);

    async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const userSignInDetails: UserSignInDto = {
            email: email,
            password: password
        };

        try {
            const result = await loginWithEmailAndPassword(userSignInDetails);
            console.log(result);
            navigate("/");

            if (remember) {
                localStorage.setItem("remember", "true");
            } else {
                localStorage.removeItem("remember");
            }


        } catch (error) {
            console.log("Error logging in: " + error);
        }
    };

    async function handleSignInWithGoogle() {
        try {
            const result = await loginWithGoogle();
            console.log(result);
            navigate("/");

            if (remember) {
                localStorage.setItem("remember", "true");
            } else {
                localStorage.removeItem("remember");
            }


        } catch (error) {
            console.log("Error logging in: " + error);
        }
    }



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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
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
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    name="remember"
                                    value={remember}
                                    onChange={() => setRemember(!remember)}
                                    color="primary"
                                />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Divider sx={{ marginY: "5%" }}>OR</Divider>
                    <GoogleButton
                        style={{ width: "100%" }}
                        onClick={handleSignInWithGoogle}
                    />
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </>
    );
}