import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Login  from "../Login/Login";
import Registration  from "../Registration/Registration";
import AboutPage from "../AboutPage/AboutPage";
import Preview from "../Preview/Preview";
import {Documentation} from "../Documentation/Documentation";
import EmployeePage from "../EmployeePage/EmployeePage";
import NewsPage from "../NewsPage/NewsPage";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Preview />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/news" element={<NewsPage />} />

        </Routes>
    );
};