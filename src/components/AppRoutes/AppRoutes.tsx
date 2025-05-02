import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preview from "../Preview/Preview";
import Login from "../Login/Login";
import AboutPage from "../AboutPage/AboutPage";
import {Documentation} from "../Documentation/Documentation";
import EmployeePage from "../EmployeePage/EmployeePage";
import NewsPage from "../NewsPage/NewsPage";
import Registration from "../Registration/Registration";
import EmployeeProfile from "../EmployeeProfile/EmployeeProfile";
import PositionPage from "../PositionPage/PositionPage";
import TechnologyPage from "../TechnologyPage/TechnologyPage";
import ProjectList from "../ProjectList/ProjectList";
import ProjectEdit from "../ProjectEdit/ProjectEdit";


export const AppRoutes = () => {
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'Главная - PanCompany';
                setFavicon('home.ico');
                break;
            case '/login':
                document.title = 'Вход - PanCompany';
                setFavicon('login.ico');
                break;
            case '/registration':
                document.title = 'Регистрация - PanCompany';
                setFavicon('registration.ico');
                break;
            case '/about':
                document.title = 'О нас - PanCompany';
                setFavicon('about.ico');
                break;
            case '/documentation':
                document.title = 'Документация - PanCompany';
                setFavicon('favicon-docs.ico');
                break;
            case '/employees':
                document.title = 'Учет работников - PanCompany';
                setFavicon('employee.ico');
                break;
            case '/news':
                document.title = 'Новости - PanCompany';
                setFavicon('news.ico');
                break;
            default:
                document.title = 'Unknowing - PanCompany';
                setFavicon('favicon-default.ico');
                break;
        }
    }, [location]);

    const setFavicon = (favicon: string) => {
        const link: HTMLLinkElement | null = document.querySelector('link[rel="icon"]');
        if (link) {
            link.href = `/static/icons/${favicon}`;
        }
    };

    return (
        <Routes>
            <Route path="/employees/:id" element={<EmployeeProfile />} />
            <Route path="/" element={<Preview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/positions" element={<PositionPage />} />
            <Route path="/technologies" element={<TechnologyPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/create" element={<ProjectEdit />} />
            <Route path="/projects/:id" element={<ProjectEdit />} />
            <Route path="*" element={<ProjectList />} />
        </Routes>
    );
};
