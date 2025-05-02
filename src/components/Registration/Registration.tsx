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
import { SnackbarMessage } from "../SnackBarMessage/SnackBarMessage";

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
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
    allowExtraEmails: boolean;
}

export default function Registration() {
    const { navigateTo } = useNavigation();
    const [formData, setFormData] = useState<FormData>({
        login: '',
        email: '',
        password: '',
        confirmPassword: '',
        allowExtraEmails: false,
    });

    const [errors, setErrors] = useState({
        login: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error";
    }>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:8080/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.login,
                        email: formData.email,
                        password: formData.password,
                        confirmPassword: formData.confirmPassword,
                        allowExtraEmails: formData.allowExtraEmails,
                    }),
                });

                const result = await response.json();

                if (!response.ok) {
                    // Ошибки с сервера
                    if (result.message.includes('Ник')) {
                        setErrors({
                            ...errors,
                            login: result.message,
                        });
                    } else if (result.message.includes('Е-mail')) {
                        setErrors({
                            ...errors,
                            email: result.message,
                        });
                    }

                    setNotification({
                        message: result.message,
                        type: "error",
                    });
                } else {
                    setNotification({
                        message: 'Регистрация прошла успешно!',
                        type: "success",
                    });
                    navigateTo('/login');
                }
            } catch (error) {
                console.error('Ошибка регистрации:', error);
                setNotification({
                    message: 'Произошла ошибка при регистрации.',
                    type: "error",
                });
            }
        } else {
            console.log('Форма содержит ошибки');
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        // Сброс ошибок при изменении поля
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validateForm = () => {
        const newErrors = {
            login: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        let isValid = true;

        if (!formData.login) {
            newErrors.login = 'Логин обязателен';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email обязателен';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Некорректный email';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Повторите пароль';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
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
                        Регистрация
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="login"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Логин"
                                    autoFocus
                                    value={formData.login}
                                    onChange={handleChange}
                                    error={!!errors.login}
                                    helperText={errors.login}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Повторите пароль"
                                    type="password"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="allowExtraEmails"
                                            color="primary"
                                            checked={formData.allowExtraEmails}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Я хочу получать маркетинговые рассылки и обновления по email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегистрироваться
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    href="#"
                                    variant="body2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigateTo('/login');
                                    }}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Typography variant="body2" color="primary">
                                        Уже есть аккаунт? Авторизуйтесь!
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright />
            </Container>
            <SnackbarMessage
                notification={notification}
                handleClose={() => setNotification(undefined)}
            />
        </ThemeProvider>
    );
}
