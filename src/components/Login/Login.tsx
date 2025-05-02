import React, { useState } from 'react';
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
import { useNavigation } from '../utils/useNavigation';
import { Loading } from "../Loading/Loading";
import { Snackbar, SnackbarContent } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const defaultTheme = createTheme();

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

interface FormData {
    username: string;
    password: string;
    remember: boolean;
}

export default function Login() {
    const { navigateTo } = useNavigation();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        remember: false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Ошибка при авторизации');
            }
            const result = await response.json();
            console.log('Авторизация успешна:', result);

            localStorage.setItem('token', result.token);
            localStorage.setItem('user', result.username);
            localStorage.setItem('role', result.role);

            setNotification({
                message: "Успешный вход!",
                type: "success",
            });
            setLoading(false);
            setTimeout(() => {
                navigateTo('/news');
            }, 1000); // Пауза перед редиректом
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                setNotification({
                    message: `Ошибка: ${error.message}`,
                    type: "error",
                });
            } else {
                setNotification({
                    message: "Неизвестная ошибка",
                    type: "error",
                });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setNotification(null);
    };

    if (loading) {
        return <Loading open />;
    }

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
                        Вход
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Имя пользователя"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="remember"
                                    color="primary"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                            }
                            label="Запомнить меня"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo('/registration');
                                    }}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography variant="body2" color="primary">
                                        Нет аккаунта? Зарегистрируйтесь!
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright />
            </Container>

            {/* Snackbar для уведомлений */}
            <Snackbar
                open={Boolean(notification)}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: notification?.type === 'error' ? 'error.main' : 'success.main',
                    }}
                    message={notification?.message}
                    action={
                        <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
                            <CloseIcon fontSize="small" />
                        </Button>
                    }
                />
            </Snackbar>
        </ThemeProvider>
    );
}
