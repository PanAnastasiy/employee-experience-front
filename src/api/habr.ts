import { Article } from "../types/Article";
import {getAuthHeaders} from "../components/utils/getAuthHeaders";

export const fetchArticles = async (): Promise<Article[]> => {
    try {

        const response = await fetch('http://localhost:8080/api/habr/rss', {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const data: Article[] = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
};
