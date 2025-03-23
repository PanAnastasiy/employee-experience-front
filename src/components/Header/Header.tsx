import React, { useState, useEffect, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    IconButton,
    Box,
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle as AccountCircleIcon,
    ArrowDropDown as ArrowDropDownIcon,
    MusicNote as MusicNoteIcon,
    MusicOff as MusicOffIcon,
} from '@mui/icons-material';
import { useNavigation } from '../utils/UseNavigation';

export default function Header() {
    const { navigateTo } = useNavigation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isPlaying, setIsPlaying] = useState(false); // музыка вкл/выкл
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Создаём аудио только один раз
        audioRef.current = new Audio('/static/audio/background-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
            // Очищаем при размонтировании
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => {
                console.warn("Автовоспроизведение запрещено:", err);
            });
        }

        setIsPlaying(!isPlaying);
    };

    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', padding: 0 }}>
            <Toolbar sx={{ paddingLeft: 0 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => navigateTo('/')}
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ marginRight: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        Мой сайт
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={() => navigateTo('/news')}>
                    Новости
                </Button>
                <Button color="inherit" onClick={() => navigateTo('/')}>
                    Главная
                </Button>
                <Button color="inherit" onClick={() => navigateTo('/about')}>
                    О нас
                </Button>
                <Button color="inherit" onClick={() => navigateTo('/employees')}>
                    Список всех работников
                </Button>

                {/* Кнопка вкл/выкл музыки */}
                <IconButton color="inherit" onClick={toggleMusic} title="Музыка">
                    {isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                    >
                        <AccountCircleIcon />
                        <ArrowDropDownIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { navigateTo('/profile'); handleClose(); }}>
                            Профиль
                        </MenuItem>
                        <MenuItem onClick={() => { navigateTo('/settings'); handleClose(); }}>
                            Настройки
                        </MenuItem>
                        <MenuItem onClick={() => { navigateTo('/logout'); handleClose(); }}>
                            Выйти
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
