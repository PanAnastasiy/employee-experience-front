import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, createProject, updateProject } from "../../api/projects";
import { Typography, Button, CircularProgress, TextField, Box, Grid } from '@mui/material';
import EmployeeProjectItem from '../EmployeeProjectItem/EmployeeProjectItem';

export default function ProjectEdit() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<any>({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        employeeProjects: []
    });
    const [loading, setLoading] = useState(!!id);

    useEffect(() => {
        if (id) {
            getProjectById(id).then(data => {
                setProject(data);
                setLoading(false);
            });
        }
    }, [id]);

    const handleChange = (field: string, value: any) => {
        setProject({ ...project, [field]: value });
    };

    const handleEmployeeChange = (index: number, field: string, value: any) => {
        const updated = [...project.employeeProjects];
        updated[index][field] = value;
        setProject({ ...project, employeeProjects: updated });
    };

    const handleAddEmployee = () => {
        setProject({
            ...project,
            employeeProjects: [
                ...project.employeeProjects,
                { employeeId: 0, fullName: '', description: '', startDate: '', endDate: '' }
            ]
        });
    };

    const handleDeleteEmployee = (index: number) => {
        const updated = project.employeeProjects.filter((_: any, i: number) => i !== index);
        setProject({ ...project, employeeProjects: updated });
    };

    const handleSave = () => {
        if (id) {
            updateProject(id, project).then(() => navigate('/projects'));
        } else {
            createProject(project).then(() => navigate('/projects'));
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box padding={4}>
            <Typography variant="h4" gutterBottom>{id ? 'Редактировать проект' : 'Создать проект'}</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Название"
                        value={project.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Описание"
                        value={project.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        fullWidth
                        multiline
                        minRows={3}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Дата начала"
                        type="date"
                        value={project.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Дата окончания"
                        type="date"
                        value={project.endDate}
                        onChange={(e) => handleChange('endDate', e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>

            <Typography variant="h5" mt={4}>Работники проекта</Typography>

            {project.employeeProjects.map((emp: any, index: number) => (
                <EmployeeProjectItem
                    key={index}
                    employee={emp}
                    onChange={(field: string, value: any) => handleEmployeeChange(index, field, value)}
                    onDelete={() => handleDeleteEmployee(index)}
                />
            ))}

            <Button onClick={handleAddEmployee} variant="outlined" style={{ marginTop: 16 }}>
                Добавить работника
            </Button>

            <Button
                onClick={handleSave}
                variant="contained"
                style={{ marginTop: 24 }}
                fullWidth
            >
                Сохранить проект
            </Button>
        </Box>
    );
}
