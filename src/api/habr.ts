import {Article} from "../types/Article";

export const fetchArticles = async (): Promise<Article[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/habr/rss');
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