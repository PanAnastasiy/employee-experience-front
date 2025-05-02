import React, { useState, useEffect } from 'react';
import PositionTable from './PositionTable/PositionTable';
import { Position } from '../../types/Position';
import { getAllPositions, updatePosition, deletePosition, createPosition } from '../../api/positions';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { SnackbarMessage } from "../SnackBarMessage/SnackBarMessage";

const PageContainer = styled('div')({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    padding: '16px',
    maxWidth: '800px',
    margin: '0 auto'
});

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const titleStyle = {
    color: 'white',
    textAlign: 'center' as const,
    fontFamily: "'Roboto', sans-serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    letterSpacing: '2px',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    backgroundImage: 'linear-gradient(45deg, #3f51b5, #2196f3)',
    WebkitBackgroundClip: 'text',
    padding: '10px',
    marginBottom: '20px'
};

const PositionPage: React.FC = () => {
    const [positions, setPositions] = useState<Position[]>([]);
    const [newPosition, setNewPosition] = useState<Omit<Position, 'id'>>({
        name: ''
    });

    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error";
    }>();

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const data = await getAllPositions();
                setPositions(data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                setNotification({
                    message: 'Не удалось загрузить список должностей',
                    type: "error"
                });
            }
        };

        fetchPositions();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewPosition({ ...newPosition, [name]: value });
    };

    const handleAdd = async () => {
        if (!newPosition.name?.trim()) {
            setNotification({
                message: 'Название должности обязательно для заполнения!',
                type: "error"
            });
            return;
        }

        try {
            const createdPosition = await createPosition({
                name: newPosition.name.trim()
            });

            setNotification({
                message: "Должность успешно добавлена!",
                type: "success"
            });

            setPositions(prev => [...prev, createdPosition]);
            setNewPosition({ name: '' });
        } catch (error: any) {
            setNotification({
                message: error.message || 'Ошибка при добавлении должности',
                type: "error"
            });
        }
    };

    const handleEdit = async (id: number, updatedPosition: Omit<Position, 'id'>) => {
        try {
            const updated = await updatePosition(id, updatedPosition);
            setPositions(prev =>
                prev.map(pos => pos.id === id ? updated : pos)
            );
            setNotification({
                message: `Должность "${updated.name}" успешно обновлена`,
                type: "success"
            });
        } catch (error: any) {
            setNotification({
                message: error.message || `Ошибка при обновлении должности`,
                type: "error"
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const positionName = positions.find(p => p.id === id)?.name || '';
            await deletePosition(id);
            setPositions(prev => prev.filter(pos => pos.id !== id));
            setNotification({
                message: `Должность "${positionName}" успешно удалена`,
                type: "success"
            });
        } catch (error: any) {
            setNotification({
                message: error.message || 'Ошибка при удалении должности',
                type: "error"
            });
        }
    };

    return (
        <PageContainer className="page-container">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <motion.h1 style={titleStyle}>
                    Список должностей
                </motion.h1>

                <PositionTable
                    positions={positions}
                    newPosition={newPosition}
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

export default PositionPage;