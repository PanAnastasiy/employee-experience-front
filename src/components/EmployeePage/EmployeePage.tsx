import React, { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable/EmployeeTable';
import { Employee } from '../../types/Employee';
import { getAllEmployees, updateEmployee, deleteEmployee, createEmployee } from '../../api/employees';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

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
        // Проверка заполненности полей с более информативными сообщениями
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
            console.log('Отправка данных нового сотрудника:', newEmployee);

            // Создаём сотрудника на сервере
            const createdEmployee = await createEmployee({
                ...newEmployee,
                firstName: newEmployee.firstName.trim(),
                lastName: newEmployee.lastName.trim(),
                email: newEmployee.email.trim(),
            });

            if (!createdEmployee) {
                throw new Error('Сервер не вернул данные созданного сотрудника');
            }

            console.log('Сотрудник успешно создан:', createdEmployee);

            // Обновляем состояние
            setEmployees((prevEmployees) => [
                ...prevEmployees,
                {
                    ...createdEmployee,
                    fullName: `${createdEmployee.firstName} ${createdEmployee.lastName}`,
                },
            ]);

            // Сбрасываем форму
            setNewEmployee({
                firstName: '',
                lastName: '',
                email: '',
                hireDate: '',
            });

        } catch (error) {
            console.error('Ошибка при добавлении сотрудника:', error);
            // Можно добавить уведомление для пользователя
            alert('Произошла ошибка при добавлении сотрудника. Пожалуйста, попробуйте ещё раз.');
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
            // Отправляем запрос на сервер для удаления сотрудника
            const success = await deleteEmployee(id);
            if (success) {
                // Если удаление прошло успешно, фильтруем список сотрудников
                setEmployees((prevEmployees) =>
                    prevEmployees.filter((employee) => employee.id !== id)
                );
            }
        } catch (error) {
            console.error('Ошибка при удалении сотрудника:', error);
        }
    };

    return (
        <PageContainer>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <div>
                    <h1>Список сотрудников</h1>
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
        </PageContainer>
    );
};

export default EmployeePage;
