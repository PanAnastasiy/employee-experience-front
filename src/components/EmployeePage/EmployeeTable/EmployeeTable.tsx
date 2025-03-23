import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Employee } from '../../../types/Employee';
import { getAllEmployees } from '../../../api/employees';

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

const EmployeeTable: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getAllEmployees();
                console.log("Data from server:", data);

                // Добавляем поле fullName
                const employeesWithFullName = data.map((employee: Employee) => ({
                    ...employee,
                    fullName: `${employee.firstName} ${employee.lastName}`,
                }));


                console.log("Employees with fullName:", employeesWithFullName);
                setEmployees(employeesWithFullName);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Идентификационный номер</StyledTableCell>
                        <StyledTableCell align="right">Фамилия Имя</StyledTableCell>
                        <StyledTableCell align="right">Эл. Адрес</StyledTableCell>
                        <StyledTableCell align="right">Дата найма</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <StyledTableRow key={employee.id}>
                            <StyledTableCell component="th" scope="row">
                                {employee.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{employee.fullName}</StyledTableCell>
                            <StyledTableCell align="right">{employee.email}</StyledTableCell>
                            <StyledTableCell align="right">{employee.hireDate}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeTable;