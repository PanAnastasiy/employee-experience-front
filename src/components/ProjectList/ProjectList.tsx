import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, deleteProject } from "../../api/projects";
import {
    Card, CardContent, Typography, Button, CircularProgress, Grid, Stack, Chip
} from '@mui/material';
import { motion } from "framer-motion";
import { Delete, Edit, Add } from '@mui/icons-material';

interface EmployeeProjectDTO {
    employeeId: number;
    fullName: string;
    description: string | null;
    startDate: string;
    endDate: string;
}

interface ProjectDTO {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    employeeProjects: EmployeeProjectDTO[];
}

export default function ProjectList() {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        getAllProjects()
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить проект?')) {
            deleteProject(id).then(() => fetchProjects());
        }
    };

    if (loading) {
        return <Stack alignItems="center" mt={10}><CircularProgress /></Stack>;
    }

    return (
        <div style={{ padding: 32 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight={600}>📁 Список проектов</Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/projects/create')}
                >
                    Создать проект
                </Button>
            </Stack>

            <Grid container spacing={3}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>{project.name}</Typography>
                                    <Typography variant="body2" color="text.secondary" mb={1}>
                                        {project.description}
                                    </Typography>

                                    <Typography variant="caption" color="text.secondary">
                                        Сроки: {project.startDate} — {project.endDate}
                                    </Typography>

                                    {project.employeeProjects.length > 0 && (
                                        <Stack mt={1} spacing={0.5}>
                                            <Typography variant="body2" fontWeight={500}>Сотрудники:</Typography>
                                            <Stack direction="row" flexWrap="wrap" gap={0.5}>
                                                {project.employeeProjects.map(emp => (
                                                    <Chip
                                                        key={emp.employeeId}
                                                        label={emp.fullName}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                ))}
                                            </Stack>
                                        </Stack>
                                    )}

                                    <Stack direction="row" spacing={1} mt={2}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Edit />}
                                            onClick={() => navigate(`/projects/${project.id}`)}
                                        >
                                            Редактировать
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<Delete />}
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
