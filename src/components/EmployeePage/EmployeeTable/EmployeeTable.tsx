import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Employee } from '../../../types/Employee';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (id: number, updatedEmployee: Omit<Employee, 'id' | 'fullName'>) => void; // Функция для редактирования
    onDelete: (id: number) => void; // Функция для удаления
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
    const [openDialog, setOpenDialog] = useState(false); // Состояние для управления открытием диалога
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null); // Состояние для хранения ID выбранного сотрудника
    const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null); // Состояние для редактирования
    const [editedEmployee, setEditedEmployee] = useState<Omit<Employee, 'id' | 'fullName'>>({
        firstName: '',
        lastName: '',
        email: '',
        hireDate: '',
    });

    const handleDelete = () => {
        if (selectedEmployeeId !== null) {
            onDelete(selectedEmployeeId); // Выполняем удаление
            setOpenDialog(false); // Закрываем диалог
        }
    };

    const handleOpenDialog = (id: number) => {
        setSelectedEmployeeId(id); // Устанавливаем ID выбранного сотрудника
        setOpenDialog(true); // Открываем диалог
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Закрываем диалог без удаления
    };

    const handleEdit = (id: number) => {
        const employeeToEdit = employees.find((emp) => emp.id === id);
        if (employeeToEdit) {
            if (editingEmployeeId === id) {
                // Сохраняем изменения
                onEdit(id, editedEmployee);
                setEditingEmployeeId(null); // Выходим из режима редактирования
            } else {
                // Входим в режим редактирования
                setEditedEmployee({
                    firstName: employeeToEdit.firstName,
                    lastName: employeeToEdit.lastName,
                    email: employeeToEdit.email,
                    hireDate: employeeToEdit.hireDate,
                });
                setEditingEmployeeId(id);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedEmployee({ ...editedEmployee, [name]: value });
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Идентификационный номер</StyledTableCell>
                            <StyledTableCell align="right">Фамилия Имя</StyledTableCell>
                            <StyledTableCell align="right">Эл. Адрес</StyledTableCell>
                            <StyledTableCell align="right">Дата найма</StyledTableCell>
                            <StyledTableCell align="right">Действия</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <StyledTableRow key={employee.id}>
                                <StyledTableCell component="th" scope="row">
                                    {employee.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {editingEmployeeId === employee.id ? (
                                        <TextField
                                            name="firstName"
                                            value={editedEmployee.firstName}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        employee.fullName
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {editingEmployeeId === employee.id ? (
                                        <TextField
                                            name="email"
                                            value={editedEmployee.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        employee.email
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    {editingEmployeeId === employee.id ? (
                                        <TextField
                                            name="hireDate"
                                            type="date"
                                            value={editedEmployee.hireDate}
                                            onChange={handleInputChange}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    ) : (
                                        employee.hireDate
                                    )}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(employee.id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        {editingEmployeeId === employee.id ? 'Сохранить' : 'Редактировать'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleOpenDialog(employee.id)} // Открываем диалог для удаления
                                    >
                                        Удалить
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Диалог подтверждения удаления */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <p>Вы уверены, что хотите удалить этого сотрудника?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Нет
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EmployeeTable;
