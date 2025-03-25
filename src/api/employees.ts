import {Employee} from "../types/Employee";

export const getAllEmployees = async () => {
    return await fetch(`http://localhost:8080/employees`, {
        mode: "cors",
    }).then(function (response) {
        console.log("API URL:", `${process.env.REACT_APP_API_HOST}/employees`);
        console.log("Response status:", response.status); // Логируем статус ответа
        console.log("Response headers:", response.headers);
        return response.json();
    });
};

export const getEmployeeById = async (employeeId: string) => {
    return await fetch(
        `${process.env.REACT_APP_API_HOST}/employees/${employeeId}`,
        { mode: "cors" }
    ).then(function (response) {
        return response.json();
    });
};

export const createEmployee = async (employee: Omit<Employee, 'id' | 'fullName'>) => {
    try {
        const response = await fetch(`http://localhost:8080/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employee),
        });

        if (!response.ok) {
            throw new Error('Работник с заданным email уже существует.');
        }

        return response.json(); // Возвращаем созданного сотрудника с сервера
    } catch (error) {
        console.error('Ошибка:', error);
        throw error; // Пробрасываем ошибку для обработки в handleAdd
    }
};

export const updateEmployee = async (id: number, employee: Omit<Employee, 'id' | 'fullName'>) => {
    try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении сотрудника');
        }

        return response.json(); // Возвращаем обновленного сотрудника
    } catch (error) {
        console.error('Ошибка:', error);
        throw error; // Пробрасываем ошибку для обработки в вызывающем коде
    }
};

export const deleteEmployee = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/employees/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении сотрудника');
        }

        // Возвращаем true, чтобы подтвердить успешное удаление
        return true;
    } catch (error) {
        console.error("Error deleting employee:", error);
        throw error;
    }
};


