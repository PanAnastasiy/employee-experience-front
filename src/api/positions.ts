import { Position } from "../types/Position";
import {getAuthHeaders} from "../components/utils/getAuthHeaders";


export const getAllPositions = async () => {// Получаем токен из localStorage
    return await fetch(`http://localhost:8080/positions`, {
        method: 'GET',
        mode: 'cors',
        headers: getAuthHeaders(),
    }).then(function (response) {
        console.log("API URL:", `${process.env.REACT_APP_API_HOST}/positions`);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
            throw new Error('Ошибка при получении позиций');
        }

        return response.json();
    });
};

export const getPositionById = async (positionId: string) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    return await fetch(
        `${process.env.REACT_APP_API_HOST}/positions/${positionId}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: getAuthHeaders(),
        }
    ).then(function (response) {
        if (!response.ok) {
            throw new Error('Ошибка при получении позиции');
        }
        return response.json();
    });
};

export const createPosition = async (position: Omit<Position, 'id'>) => {
    try {
        const response = await fetch(`http://localhost:8080/positions`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(position),
        });

        if (!response.ok) {
            throw new Error('Позиция с такими данными уже существует.');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const updatePosition = async (id: number, position: Omit<Position, 'id'>) => {
    try {
        const response = await fetch(`http://localhost:8080/positions/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(position),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении позиции');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const deletePosition = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/positions/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении позиции');
        }

        return true;
    } catch (error) {
        console.error("Error deleting position:", error);
        throw error;
    }
};
