import { Project } from "../types/Project";
import {getAuthHeaders} from "../components/utils/getAuthHeaders";



export const getAllProjects = async () => {
    try {
        const response = await fetch(`http://localhost:8080/projects`, {
            mode: "cors",
            headers: getAuthHeaders(),
        });
        console.log("Ответ от сервера:", response);
        if (!response.ok) {
            throw new Error("Ошибка при получении списка проектов");
        }
        return response.json();
    } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
        throw error;
    }
};

export const getProjectById = async (projectId: number | string) => {
    try {
        const response = await fetch(`http://localhost:8080/projects/${projectId}`, {
            mode: "cors",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error("Ошибка при получении проекта");
        }

        return response.json();
    } catch (error) {
        console.error("Ошибка загрузки проекта:", error);
        throw error;
    }
};

export const createProject = async (project: Omit<Project, 'id'>) => {
    try {
        const response = await fetch(`http://localhost:8080/projects`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error("Ошибка при создании проекта");
        }

        return response.json();
    } catch (error) {
        console.error("Ошибка создания проекта:", error);
        throw error;
    }
};

export const updateProject = async (id: number | string, project: Omit<Project, 'id'>) => {
    try {
        const response = await fetch(`http://localhost:8080/projects/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error("Ошибка при обновлении проекта");
        }

        return response.json();
    } catch (error) {
        console.error("Ошибка обновления проекта:", error);
        throw error;
    }
};

export const deleteProject = async (id: number | string) => {
    try {
        const response = await fetch(`http://localhost:8080/projects/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error("Ошибка при удалении проекта");
        }

        return true;
    } catch (error) {
        console.error("Ошибка удаления проекта:", error);
        throw error;
    }
};
