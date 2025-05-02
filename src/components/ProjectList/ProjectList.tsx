import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, deleteProject } from "../../api/projects";
import { Card, CardContent, Typography, Button, CircularProgress, Grid } from '@mui/material';

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
        return <CircularProgress />;
    }

    return (
        <div style={{ padding: 32 }}>
            <Typography variant="h4" gutterBottom>Проекты</Typography>
            <Button variant="contained" onClick={() => navigate('/projects/create')}>Создать проект</Button>

            <Grid container spacing={2} marginTop={2}>
                {projects.map(project => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{project.name}</Typography>
                                <Typography variant="body2">{project.description}</Typography>
                                <Button size="small" onClick={() => navigate(`/projects/${project.id}`)}>Редактировать</Button>
                                <Button size="small" color="error" onClick={() => handleDelete(project.id)}>Удалить</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

