 // Import the function

import {getAuthHeaders} from "../components/utils/getAuthHeaders";
 import {Technology} from "../types/Technology";

 export const getAllTechnologies = async () => {
    return await fetch("http://localhost:8080/technologies", {
        method: "GET",  // Added method for clarity
        mode: "cors",
        headers: getAuthHeaders(),
    }).then(function (response) {
        console.log("API URL:", `${process.env.REACT_APP_API_HOST}/technologies`);
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        return response.json();
    });
};

export const getTechnologyById = async (technologyId: string) => {
    return await fetch(
        `${process.env.REACT_APP_API_HOST}/technologies/${technologyId}`,
        {
            method: "GET",  // Added method for clarity
            mode: "cors",
            headers: getAuthHeaders(),
        }
    ).then(function (response) {
        return response.json();
    });
};

export const createTechnology = async (technology: Omit<Technology, 'id'>) => {
    try {
        const response = await fetch("http://localhost:8080/technologies", {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(technology),
        });

        if (!response.ok) {
            throw new Error('Технология с такими данными уже существует.');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const updateTechnology = async (id: number, technology: Omit<Technology, 'id'>) => {
    try {
        const response = await fetch(`http://localhost:8080/technologies/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(technology),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении технологии');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};

export const deleteTechnology = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/technologies/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении технологии');
        }

        return true;
    } catch (error) {
        console.error("Ошибка при удалении технологии:", error);
        throw error;
    }
};
