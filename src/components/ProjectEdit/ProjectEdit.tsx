import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById, createProject, updateProject } from "../../api/projects";
import {
    Typography, Button, CircularProgress, TextField, Box, Grid, Stack, Paper
} from '@mui/material';
import EmployeeProjectItem from '../EmployeeProjectItem/EmployeeProjectItem';
import { motion } from 'framer-motion';

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
        setProject((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleDeleteEmployee = (index: number) => {
        const updated = project.employeeProjects.filter((_: any, i: number) => i !== index);
        setProject((prev: any) => ({ ...prev, employeeProjects: updated }));
    };


    const handleEmployeeChange = (index: number, field: string, value: any) => {
        const updated = [...project.employeeProjects];
        updated[index][field] = value;
        setProject({ ...project, employeeProjects: updated });
    };

    const handleAddEmployee = () => {
        setProject((prev: any) => ({
            ...prev,
            employeeProjects: [
                ...prev.employeeProjects,
                { employeeId: 0, fullName: '', description: '', startDate: '', endDate: '' }
            ]
        }));
    };

    const handleSave = () => {
        const request = id ? updateProject(id, project) : createProject(project);
        request.then(() => navigate('/projects'));
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;
    }

    return (
        <Box padding={4}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    {id ? 'Редактировать проект' : 'Создать проект'}
                </Typography>

                <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
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
                </Paper>

                <Typography variant="h5" gutterBottom>Работники проекта</Typography>

                <Stack spacing={2} mb={2}>
                    {project.employeeProjects.map((emp: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <EmployeeProjectItem
                                employee={emp}
                                onChange={(field, value) => handleEmployeeChange(index, field, value)}
                                onDelete={() => handleDeleteEmployee(index)}
                            />
                        </motion.div>
                    ))}
                </Stack>

                <Button onClick={handleAddEmployee} variant="outlined" sx={{ mb: 3 }}>
                    ➕ Добавить работника
                </Button>

                <Button
                    onClick={handleSave}
                    variant="contained"
                    size="large"
                    fullWidth
                >
                    💾 Сохранить проект
                </Button>
            </motion.div>
        </Box>
    );
}
