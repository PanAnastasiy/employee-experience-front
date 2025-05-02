import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable/EmployeeTable';
import { Employee } from '../../types/Employee';
import { getAllEmployees, updateEmployee, deleteEmployee, createEmployee } from '../../api/employees';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

import './EmployeePage.css';
import {SnackbarMessage} from "../SnackBarMessage/SnackBarMessage";

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

const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 2, ease: 'easeInOut' } },
};


const col = {
    color: 'white'
};


const textAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 5, ease: 'easeInOut' } },
};

const ImageContainer = styled('div')({
    paddingTop: '20px',
    position: 'relative',
    maxWidth: '100%',
    overflow: 'hidden',
    borderRadius: '20px',
    height: '100%',
});

const EmployeePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id' | 'fullName'>>({
        firstName: '',
        lastName: '',
        email: '',
        hireDate: '',
    });

    const pulseAnimation = {
        hidden: { scale: 1 },
        visible: {
            scale: [1, 1.1, 1],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: 'easeInOut',
            },
        },
    };

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

        const audio = new Audio('/static/audio/single.mp3');
        audio.volume = 0.3;
        audio.play().catch((err) => console.warn('Ошибка воспроизведения звука:', err));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const col = {
        color: 'white',
        textAlign: 'center' as 'center',
        fontFamily: "'Roboto', sans-serif",
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        letterSpacing: '2px',
        fontSize: '3rem',
        fontWeight: 'bold',
        backgroundImage: 'linear-gradient(45deg, #ff4081, #3f51b5)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        padding: '10px',
        transition: 'all 0.3s ease-in-out',
    };

    const textAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2, ease: 'easeInOut' } },
    };

    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error";
    }>();

    const handleAdd = async () => {
        if (!newEmployee.firstName?.trim()) {
            console.error('Поле "Имя" обязательно для заполнения!');
            return;
        }
        if (!newEmployee.lastName?.trim()) {
            console.error('Поле "Фамилия" обязательно для заполнения!');
            return;
        }
        if (!newEmployee.email?.trim()) {
            console.error('Поле "Email" обязательно для заполнения!');
            return;
        }
        if (!newEmployee.hireDate) {
            console.error('Поле "Дата найма" обязательно для заполнения!');
            return;
        }

        try {
            const createdEmployee = await createEmployee({
                ...newEmployee,
                firstName: newEmployee.firstName.trim(),
                lastName: newEmployee.lastName.trim(),
                email: newEmployee.email.trim(),
            });
            setNotification({
                message: "Сотрудник успешно добавлен!",
                type: "success",
            });
            if (!createdEmployee) {
                throw new Error('Сервер не вернул данные созданного сотрудника');
            }

            setEmployees((prevEmployees) => [
                ...prevEmployees,
                {
                    ...createdEmployee,
                    fullName: `${createdEmployee.firstName} ${createdEmployee.lastName}`,
                },
            ]);
        } catch (error: any) {
            setNotification({
                message: error.message,
                type: "error",
            });
        }
        setNewEmployee({
            firstName: '',
            lastName: '',
            email: '',
            hireDate: '',
        });
    };

    const handleEdit = async (id: number, updatedEmployee: Omit<Employee, 'id' | 'fullName'>) => {
        try {
            const updated = await updateEmployee(id, updatedEmployee);
            const updatedEmployees = employees.map((emp) =>
                emp.id === id ? { ...emp, ...updated, fullName: `${updated.firstName} ${updated.lastName}` } : emp
            );
            setEmployees(updatedEmployees);
            setNotification({
                message: `Сотрудник  №${id} успешно изменен.`,
                type: "success",
            });
        } catch (error: any) {
            console.error('Ошибка при обновлении сотрудника:', error);
            setNotification({
                message: error.message || "Произошла ошибка при редактировании cотрудника №" + id,
                type: "error",
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const success = await deleteEmployee(id);
            if (success) {
                setNotification({
                    message: `Сотрудник  №${id} успешно удалён.`,
                    type: "success",
                });
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee.id !== id)
                );
            }
        } catch (error: any) {
            setNotification({
                message: error.message || "Произошла ошибка при удалении cотрудника №" + id,
                type: "error",
            });
        }
    };

    return (
        <PageContainer className="page-container">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <div>
                    <motion.h1 variants={pulseAnimation} style={col}>
                        Список сотрудников
                    </motion.h1>
                    <EmployeeTable
                        employees={employees}
                        newEmployee={newEmployee}
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onInputChange={handleInputChange}
                    />
                </div>
            </motion.div>
            <ImageContainer>
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        left: '10%',
                        color: 'white',
                        fontSize: '48px',
                        fontWeight: 'bold',
                        width: '50px',
                        zIndex: 1,
                    }}
                    variants={textAnimation}
                    initial="hidden"
                    animate="visible"
                >
                    Создаем великое. Вместе!
                </motion.div>
                <motion.img
                    src="/static/images/employee-nav.jpg"
                    alt="Employee Image"
                    variants={imageAnimation}
                    initial="hidden"
                    animate="visible"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '613px',
                        objectFit: 'cover',
                        borderRadius: '15px',
                    }}
                />
            </ImageContainer>

            <SnackbarMessage
                notification={notification}
                handleClose={() => setNotification(undefined)}
            />
        </PageContainer>

    );
};

export default EmployeePage;

