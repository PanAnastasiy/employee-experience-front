import { useState } from 'react';
import { TextField, Box, List, ListItem, ListItemText, Button, Grid, ListItemButton } from '@mui/material';
import { searchEmployees } from "../../api/employees";

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
    const [employeeSuggestions, setEmployeeSuggestions] = useState<{ id: number, fullName: string }[]>([]); // Типизация для предложений сотрудников

    const handleEmployeeNameChange = async (value: string) => {
        // Обновляем имя сотрудника
        onChange('fullName', value);

        if (value) {
            // Запрашиваем сотрудников, если имя не пустое
            try {
                const employees = await searchEmployees(value);
                setEmployeeSuggestions(employees);  // Сохраняем найденных сотрудников
            } catch (error) {
                console.error("Ошибка при поиске сотрудников", error);
            }
        } else {
            // Если поле пустое, очищаем предложения
            setEmployeeSuggestions([]);
        }
    };

    return (
        <Box marginBottom={2}>
            <TextField
                label="Имя сотрудника"
                value={employee.fullName}
                onChange={(e) => handleEmployeeNameChange(e.target.value)}  // Вызов функции для поиска
                fullWidth
            />

            {/* Если есть предложения, отображаем их */}
            {employeeSuggestions.length > 0 && (
                <List>
                    {employeeSuggestions.map((emp) => (
                        <ListItemButton
                            key={emp.id}
                            onClick={() => {
                                onChange('fullName', emp.fullName);
                                onChange('employeeId', emp.id);  // Записываем ID сотрудника
                                setEmployeeSuggestions([]);  // Очищаем предложения
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
                minRows={3}
                style={{ marginTop: 8 }}
            />
            <Grid container spacing={2} style={{ marginTop: 8 }}>
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
            <Button variant="contained" color="error" onClick={onDelete} style={{ marginTop: 8 }}>
                Удалить
            </Button>
        </Box>
    );
};

export default EmployeeProjectItem;
