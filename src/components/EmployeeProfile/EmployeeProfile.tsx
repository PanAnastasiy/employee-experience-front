import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Card, CardContent, Typography, Grid, Divider, Chip
} from '@mui/material';
import {
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Avatar,
    Button,
    Link,
    Box
} from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

interface EmployeeFullProfile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    hire_date: string;
    profile: {
        birth_date: string;
        address: string;
        city: string;
        gender: string;
        nationality: string;
        phone_number: string;
    };
    user: {
        username: string;
        role: string;
    };
    projects: {
        name: string;
        start_date: string;
        end_date: string;
        description: string;
    }[];
    positions: {
        name: string;
        start_date: string;
        end_date: string;
        description: string;
    }[];
    technologies: {
        name: string;
        skill_level: string;
        description: string;
    }[];
}

const EmployeeProfile: React.FC = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState<EmployeeFullProfile | null>(null);
    const [value, setValue] = useState(0); // for Tabs

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        const mockEmployee: EmployeeFullProfile = {
            id: Number(id),
            first_name: 'Иван',
            last_name: 'Иванов',
            email: 'ivanov@example.com',
            hire_date: '2020-01-15',
            profile: {
                birth_date: '1990-06-25',
                phone_number: '+7 999 123-45-67',
                address: 'г. Москва, ул. Пушкина, д. 1',
                city: 'Москва',
                gender: 'Мужской',
                nationality: 'Россия'
            },
            user: {
                username: 'ivanov',
                role: 'Admin' // 👈 именно string, а не объект
            },
            positions: [
                {
                    name: 'Frontend Developer',
                    start_date: '2021-01-01',
                    end_date: '', // 👈 пустая строка вместо null
                    description: 'Разработка интерфейса'
                },
                {
                    name: 'Intern',
                    start_date: '2020-01-15',
                    end_date: '2020-12-31',
                    description: 'Стажировка'
                }
            ],
            projects: [
                {
                    name: 'CRM-система',
                    start_date: '2022-03-01',
                    end_date: '', // 👈 пустая строка вместо null
                    description: 'Разработка интерфейса для клиентов'
                }
            ],
            technologies: [
                {
                    name: 'React',
                    skill_level: 'Expert',
                    description: 'Основной стек'
                },
                {
                    name: 'TypeScript',
                    skill_level: 'Intermediate',
                    description: 'Используется для типизации'
                }
            ]
        };

        setTimeout(() => {
            setEmployee(mockEmployee);
        }, 500);
    }, [id]);

    if (!employee) return <Typography>Загрузка...</Typography>;

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Сотрудники / {employee.first_name} {employee.last_name}
                    </Typography>
                    <Button color="inherit">Написать на эл. почту</Button>
                    <Link href="#" underline="hover">
                        Редактировать профиль
                    </Link>
                    <Link href="#" underline="hover">
                        Отправить доступ
                    </Link>
                </Toolbar>
            </AppBar>

            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Профиль" />
                    <Tab label="Задачи" />
                    <Tab label="Файлы" />
                    <Tab label="Ревью" />
                    <Tab label="Запросы" />
                    <Tab label="Отчеты" />
                    <Tab label="Учет времени" />
                    <Tab label="График" />
                    <Tab label="Комментарии" />
                </Tabs>
            </Box>

            {/* Main Content */}
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {/* Left Column: Profile Details */}
                    <Grid item xs={8}>
                        <Card className="p-4">
                            <CardContent>
                                {/* Employee Header */}
                                <Typography variant="h4" gutterBottom>
                                    {employee.first_name} {employee.last_name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Email: {employee.email}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Дата найма: {employee.hire_date}
                                </Typography>

                                <Divider className="my-4" />

                                {/* Profile Section */}
                                <Typography variant="h6" gutterBottom>
                                    Профиль
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography>Телефон: {employee.profile.phone_number}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Город: {employee.profile.city}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Адрес: {employee.profile.address}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Дата рождения: {employee.profile.birth_date}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Пол: {employee.profile.gender}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Национальность: {employee.profile.nationality}</Typography>
                                    </Grid>
                                </Grid>

                                <Divider className="my-4" />

                                {/* User Information Section */}
                                <Typography variant="h6" gutterBottom>
                                    Пользователь
                                </Typography>
                                <Typography>Логин: {employee.user.username}</Typography>
                                <Typography>Роль: {employee.user.role}</Typography>

                                <Divider className="my-4" />

                                {/* Projects Section */}
                                <Typography variant="h6" gutterBottom>
                                    Проекты
                                </Typography>
                                {employee.projects.map((project, idx) => (
                                    <Card className="my-2" key={idx}>
                                        <CardContent>
                                            <Typography variant="subtitle1">{project.name}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Период: {project.start_date} – {project.end_date}
                                            </Typography>
                                            <Typography variant="body2">{project.description}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}

                                <Divider className="my-4" />

                                {/* Positions Section */}
                                <Typography variant="h6" gutterBottom>
                                    Позиции
                                </Typography>
                                {employee.positions.map((position, idx) => (
                                    <Card className="my-2" key={idx}>
                                        <CardContent>
                                            <Typography variant="subtitle1">{position.name}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Период: {position.start_date} – {position.end_date}
                                            </Typography>
                                            <Typography variant="body2">{position.description}</Typography>
                                        </CardContent>
                                    </Card>
                                ))}

                                <Divider className="my-4" />

                                {/* Technologies Section */}
                                <Typography variant="h6" gutterBottom>
                                    Навыки и технологии
                                </Typography>
                                <Grid container spacing={2}>
                                    {employee.technologies.map((tech, idx) => (
                                        <Grid item key={idx}>
                                            <Chip label={`${tech.name} (${tech.skill_level})`} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column: Photo and General Info */}
                    <Grid item xs={4}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {/* Фотография сотрудника */}
                            <Avatar alt={employee.first_name} src="/avatar.jpg" sx={{ width: 200, height: 200 }} />

                            {/* Общая информация */}
                            <Box>
                                <Typography variant="h6">Общая информация</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography>Статус</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Сотрудник</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Роль в системе</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Сотрудник</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Должность</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{employee.user.role}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Уровень сотрудника</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Middle</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Команды</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Link href="#" underline="hover">
                                            Testers
                                        </Link>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Формат трудоустройства</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>ФЛП</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>Начало работы</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>{employee.hire_date}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                sx={{ mt: 3 }}
                                startIcon={<PhoneIcon />}
                            >
                                Позвонить
                            </Button>
                            <Button
                                color="secondary"
                                variant="contained"
                                sx={{ mt: 2 }}
                                startIcon={<EmailIcon />}
                            >
                                Написать
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EmployeeProfile;
