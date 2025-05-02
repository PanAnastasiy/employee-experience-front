import React, { useState, useEffect, useCallback } from 'react';
import TechnologyTable from './TechnologyTable/TechnologyTable';


import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {Technology} from "../../types/Technology";
import {SnackbarMessage} from "../SnackBarMessage/SnackBarMessage";
import {createTechnology, deleteTechnology, getAllTechnologies, updateTechnology} from "../../api/technologies";


// Стили
const PageContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    padding: '16px',
    maxWidth: '800px',
    margin: '0 auto',
});

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const titleStyle: React.CSSProperties = {
    color: 'white',
    textAlign: 'center',
    fontFamily: "'Roboto', sans-serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '2px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(45deg, #3f51b5, #2196f3)',
    WebkitBackgroundClip: 'text',
    padding: '10px',
    marginBottom: '20px',
};

// Тип для уведомлений
type Notification = {
    message: string;
    type: 'success' | 'error';
};

const TechnologyPage: React.FC = () => {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [newTechnology, setNewTechnology] = useState<Omit<Technology, 'id'>>({ name: '', description: ''});
    const [notification, setNotification] = useState<Notification>();
    const [loading, setLoading] = useState(false);

    // Загрузка данных
    useEffect(() => {
        const fetchTechnologies = async () => {
            setLoading(true);
            try {
                const data = await getAllTechnologies();
                setTechnologies(data);
            } catch (error) {
                console.error('Ошибка при загрузке:', error);
                setNotification({
                    message: 'Не удалось загрузить список технологий',
                    type: 'error',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTechnologies();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTechnology(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = useCallback(async () => {
        if (!newTechnology.name.trim()) {
            setNotification({
                message: 'Название технологии обязательно для заполнения!',
                type: 'error',
            });
            return;
        }

        try {
            const created = await createTechnology({ name: newTechnology.name.trim(), description:newTechnology.description.trim() });
            setTechnologies(prev => [...prev, created]);
            setNewTechnology({ name: '', description:'' });
            setNotification({
                message: 'Технология успешно добавлена!',
                type: 'success',
            });
        } catch (error: any) {
            setNotification({
                message: error.message || 'Ошибка при добавлении технологии',
                type: 'error',
            });
        }
    }, [newTechnology]);

    const handleEdit = useCallback(async (id: number, updated: Omit<Technology, 'id'>) => {
        try {
            const result = await updateTechnology(id, updated);
            setTechnologies(prev =>
                prev.map(tech => (tech.id === id ? result : tech))
            );
            setNotification({
                message: `Технология "${result.name}" успешно обновлена`,
                type: 'success',
            });
        } catch (error: any) {
            setNotification({
                message: error.message || 'Ошибка при обновлении технологии',
                type: 'error',
            });
        }
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        try {
            const name = technologies.find(t => t.id === id)?.name || '';
            await deleteTechnology(id);
            setTechnologies(prev => prev.filter(t => t.id !== id));
            setNotification({
                message: `Технология "${name}" успешно удалена`,
                type: 'success',
            });
        } catch (error: any) {
            setNotification({
                message: error.message || 'Ошибка при удалении технологии',
                type: 'error',
            });
        }
    }, [technologies]);

    return (
        <PageContainer>
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <motion.h1 style={titleStyle}>
                    Список технологий
                </motion.h1>

                <TechnologyTable
                    technologies={technologies}
                    newTechnology={newTechnology}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onInputChange={handleInputChange}
                />
            </motion.div>

            <SnackbarMessage
                notification={notification}
                handleClose={() => setNotification(undefined)}
            />
        </PageContainer>
    );
};

export default TechnologyPage;

