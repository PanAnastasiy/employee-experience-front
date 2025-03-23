import React, { useState } from 'react';
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
} from '@mui/icons-material';
import { useNavigation } from '../utils/UseNavigation';

export default function Header() {
    const { navigateTo } = useNavigation();

    // Состояние для выпадающего меню
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    // Обработчик открытия меню
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Обработчик закрытия меню
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1976d2', padding:0}}>
            <Toolbar sx={{ paddingLeft: 0 }}> {/* Убираем отступ слева */}
                {/* Логотип и название сайта */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer', // Добавляем курсор-указатель
                    }}
                    onClick={() => navigateTo('/')} // Переход на главную страницу
                >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ marginRight: 1 }}
                    >
                        <MenuIcon /> {/* Иконка меню */}
                    </IconButton>
                    <Typography variant="h6" component="div">
                        Мой сайт
                    </Typography>
                </Box>

                {/* Основные пункты меню */}
                <Box sx={{ flexGrow: 1 }} /> {/* Пустое пространство между элементами */}
                <Button color="inherit" onClick={() => navigateTo('/')}>
                    Главная
                </Button>
                <Button color="inherit" onClick={() => navigateTo('/about')}>
                    О нас
                </Button>
                <Button color="inherit" onClick={() => navigateTo('/employees')}>
                    Список всех работников
                </Button>

                {/* Выпадающее меню */}
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