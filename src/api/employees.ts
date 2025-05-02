import { Employee } from "../types/Employee";
import {getAuthHeaders} from "../components/utils/getAuthHeaders";



export const getAllEmployees = async () => {
    return await fetch(`http://localhost:8080/employees`, {
        mode: "cors",
        headers: getAuthHeaders(),
    }).then(response => {
        console.log("API URL:", `${process.env.REACT_APP_API_HOST}/employees`);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        return response.json();
    });
};

export const searchEmployees = async (query: string) => {
    const response = await fetch(`http://localhost:8080/employees?name=${encodeURIComponent(query)}`, {
        mode: "cors",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error('Ошибка поиска сотрудников');
    }
    return response.json();
};

export const getEmployeeById = async (employeeId: string) => {
    return await fetch(
        `${process.env.REACT_APP_API_HOST}/employees/${employeeId}`,
        {
            mode: "cors",
            headers: getAuthHeaders(),
        }
    ).then(response => response.json());
};

export const createEmployee = async (employee: Omit<Employee, 'id' | 'fullName'>) => {
    try {
        const response = await fetch(`http://localhost:8080/employees`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(employee),
        });

        if (!response.ok) {
            throw new Error('Работник с заданным email уже существует.');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const updateEmployee = async (id: number, employee: Omit<Employee, 'id' | 'fullName'>) => {
    try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(employee),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении сотрудника');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const deleteEmployee = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении сотрудника');
        }

        return true;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};
