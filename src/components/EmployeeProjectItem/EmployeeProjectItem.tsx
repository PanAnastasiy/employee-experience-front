import { useState } from 'react';
import {
    TextField, Box, Grid, Button, List, ListItemText, ListItemButton, Paper
} from '@mui/material';
import { searchEmployees } from '../../api/employees';

interface EmployeeProjectItemProps {
    employee: {
        employeeId: number;
        fullName: string;
        description: string;
        startDate: string;
        endDate: string;
    };
    onChange: (field: string, value: any) => void;
    onDelete: () => void;
}

const EmployeeProjectItem: React.FC<EmployeeProjectItemProps> = ({ employee, onChange, onDelete }) => {
    const [employeeSuggestions, setEmployeeSuggestions] = useState<{ id: number, fullName: string }[]>([]);

    const handleEmployeeNameChange = async (value: string) => {
        onChange('fullName', value);

        if (value.length >= 2) {
            try {
                const employees = await searchEmployees(value);
                // Собираем fullName вручную
                const suggestions = employees.map((e: any) => ({
                    id: e.id,
                    fullName: `${e.firstName} ${e.lastName}`
                }));
                setEmployeeSuggestions(suggestions);
            } catch (error) {
                console.error("Ошибка при поиске сотрудников", error);
                setEmployeeSuggestions([]);
            }
        } else {
            setEmployeeSuggestions([]);
        }
    };


    return (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <TextField
                label="Имя сотрудника"
                value={employee.fullName}
                onChange={(e) => handleEmployeeNameChange(e.target.value)}
                fullWidth
            />
            {employeeSuggestions.length > 0 && (
                <List dense>
                    {employeeSuggestions.map(emp => (
                        <ListItemButton
                            key={emp.id}
                            onClick={() => {
                                onChange('employeeId', emp.id);
                                onChange('fullName', emp.fullName);
                                setEmployeeSuggestions([]);
                            }}
                        >
                            <ListItemText primary={emp.fullName} />
                        </ListItemButton>
                    ))}
                </List>
            )}

            <TextField
                label="Описание работы"
                value={employee.description}
                onChange={(e) => onChange('description', e.target.value)}
                fullWidth
                multiline
                minRows={2}
                sx={{ mt: 2 }}
            />

            <Grid container spacing={2} mt={1}>
                <Grid item xs={6}>
                    <TextField
                        label="Дата начала"
                        type="date"
                        value={employee.startDate}
                        onChange={(e) => onChange('startDate', e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Дата окончания"
                        type="date"
                        value={employee.endDate}
                        onChange={(e) => onChange('endDate', e.target.value)}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>

            <Button
                variant="outlined"
                color="error"
                onClick={onDelete}
                fullWidth
                sx={{ mt: 2 }}
            >
                ❌ Удалить работника
            </Button>
        </Paper>
    );
};

export default EmployeeProjectItem;
