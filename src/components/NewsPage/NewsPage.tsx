import React, { useEffect, useState } from 'react';
import './NewsPage.css';
import {Article} from "../../types/Article";
import {fetchArticles} from "../../api/habr";



const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchArticles()
            .then((data) => {
                setArticles(data);
                setLoading(false);
            })
            .catch(() => {
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

