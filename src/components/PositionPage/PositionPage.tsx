import React, { useState, useEffect } from 'react';
import PositionTable from './PositionTable/PositionTable';
import { Position } from '../../types/Position';
import { getAllPositions, updatePosition, deletePosition, createPosition } from '../../api/positions';
import { SnackbarMessage } from "../SnackBarMessage/SnackBarMessage";
import './PositionPage.css';

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
        <div className="position-page">
            <div className="glass-card">
                <h1 className="page-title">Список должностей</h1>

                <PositionTable
                    positions={positions}
                    newPosition={newPosition}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onInputChange={handleInputChange}
                />

                <SnackbarMessage
                    notification={notification}
                    handleClose={() => setNotification(undefined)}
                />
            </div>
        </div>
    );
};

export default PositionPage;
