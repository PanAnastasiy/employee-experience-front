import React, { useEffect, useState } from 'react';
import './NewsPage.css';

interface Article {
    title: string;
    link: string;
    pubDate: string;
    imageUrl: string | null;
}

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/habr/rss')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json();
            })
            .then((data: Article[]) => {
                setArticles(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Загрузка новостей...</p>;
    }

    return (
        <div className="page-wrapper">
            <header className="news-header">
            </header>
            <div className="news-container">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="news-card"
                        style={{ '--i': index } as React.CSSProperties}
                    >
                        {article.imageUrl ? (
                            <img
                                src={article.imageUrl}
                                alt="preview"
                                className="news-image"
                            />
                        ) : (
                            <img
                                src="/static/images/news-header.jpg" // Укажите путь к картинке по умолчанию
                                alt="default preview"
                                className="news-image"
                            />
                        )}
                        <div className="news-content">
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                <h3 className="news-title">{article.title}</h3>
                            </a>
                            <p className="news-date">{article.pubDate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;

