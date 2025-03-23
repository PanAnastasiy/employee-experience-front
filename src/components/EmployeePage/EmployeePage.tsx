import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable/EmployeeTable';
import { Employee } from '../../types/Employee';
import { getAllEmployees, updateEmployee, deleteEmployee, createEmployee } from '../../api/employees';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
}));

const PageContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '16px',
    padding: '16px',
});

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const EmployeePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id' | 'fullName'>>({
        firstName: '',
        lastName: '',
        email: '',
        hireDate: '',
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const data = await getAllEmployees();
                const employeesWithFullName = data.map((employee: Employee) => ({
                    ...employee,
                    fullName: `${employee.firstName} ${employee.lastName}`,
                }));
                setEmployees(employeesWithFullName);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchEmployees();

        // Звук при появлении страницы
        const audio = new Audio('/static/audio/single.mp3');
        audio.volume = 0.3;
        audio.play().catch((err) => console.warn('Ошибка воспроизведения звука:', err));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAdd = async () => {
        try {
            const createdEmployee = await createEmployee(newEmployee);
            if (createdEmployee) {
                const employeeWithId: Employee = {
                    ...createdEmployee,
                    fullName: `${createdEmployee.firstName} ${createdEmployee.lastName}`,
                };
                setEmployees([...employees, employeeWithId]);
                setNewEmployee({ firstName: '', lastName: '', email: '', hireDate: '' });
            }
        } catch (error) {
            console.error('Ошибка при добавлении сотрудника:', error);
        }
    };

    const handleEdit = async (id: number, updatedEmployee: Omit<Employee, 'id' | 'fullName'>) => {
        try {
            const updated = await updateEmployee(id, updatedEmployee);
            const updatedEmployees = employees.map((emp) =>
                emp.id === id ? { ...emp, ...updated, fullName: `${updated.firstName} ${updated.lastName}` } : emp
            );
            setEmployees(updatedEmployees);
        } catch (error) {
            console.error('Ошибка при обновлении сотрудника:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter((employee) => employee.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении сотрудника:', error);
        }
    };

    return (
        <PageContainer>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <FormContainer elevation={3}>
                    <h2>Добавить нового сотрудника</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <TextField
                            fullWidth
                            label="Имя"
                            name="firstName"
                            value={newEmployee.firstName}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Фамилия"
                            name="lastName"
                            value={newEmployee.lastName}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Дата найма"
                            name="hireDate"
                            type="date"
                            value={newEmployee.hireDate}
                            onChange={handleInputChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <Button variant="contained" color="primary" onClick={handleAdd}>
                            Добавить
                        </Button>
                    </form>
                </FormContainer>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <div>
                    <h1>Список сотрудников</h1>
                    <EmployeeTable
                        employees={employees}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </motion.div>
        </PageContainer>
    );
};

export default EmployeePage;
