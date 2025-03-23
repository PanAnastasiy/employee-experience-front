import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Employee } from '../../../types/Employee';

interface EmployeeCardProps {
    employee: Employee & { fullName: string };
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onDelete }) => {
    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="180"
                image="/static/images/avatar-default.jpg"
                alt={employee.fullName}
            />
            <CardContent>
                <Typography variant="h6">{employee.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">Email: {employee.email}</Typography>
                <Typography variant="body2" color="text.secondary">Дата найма: {employee.hireDate}</Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" onClick={() => onEdit(employee.id)}>
                        Редактировать
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => onDelete(employee.id)}>
                        Удалить
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default EmployeeCard;

