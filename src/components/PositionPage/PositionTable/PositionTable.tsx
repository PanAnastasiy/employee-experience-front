import React, { useState } from 'react';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Paper, IconButton, TextField,
    Dialog, DialogActions, DialogContent, DialogTitle, Button, Box, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Position } from '../../../types/Position';

interface Props {
    positions: Position[];
    newPosition: Omit<Position, 'id'>;
    onEdit: (id: number, updated: Omit<Position, 'id'>) => void;
    onDelete: (id: number) => void;
    onAdd: (newPosition: Omit<Position, 'id'>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PositionTable: React.FC<Props> = ({
                                            positions,
                                            newPosition,
                                            onEdit,
                                            onDelete,
                                            onAdd,
                                            onInputChange
                                        }) => {
    const [editMode, setEditMode] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [editedPosition, setEditedPosition] = useState<Omit<Position, 'id'>>({ name: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [positionIdToDelete, setPositionIdToDelete] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredPositions = positions.filter(pos =>
        pos.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditClick = (pos: Position) => {
        setEditMode(pos.id);
        setEditedPosition({ name: pos.name });
    };

    const handleAddClick = () => {
        setAdding(true);
    };

    const handleAddSave = () => {
        if (!newPosition.name) {
            console.error('Название должности обязательно!');
            return;
        }
        onAdd(newPosition);
        setAdding(false);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedPosition(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = (id: number) => {
        onEdit(id, editedPosition);
        setEditMode(null);
    };

    const handleCancel = () => {
        setEditMode(null);
        setAdding(false);
    };

    const handleOpenDialog = (id: number) => {
        setPositionIdToDelete(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setPositionIdToDelete(null);
    };

    const handleDelete = (id: number) => {
        if (id !== null) {
            onDelete(id);
            setOpenDialog(false);
        }
    };

    return (
        <>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
                <WorkOutlineIcon fontSize="large" color="primary" />
                <Box>
                    <TextField
                        label="Поиск должностей"
                        variant="outlined"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        size="small"
                        fullWidth
                    />
                    <Box mt={1}>
                        <strong>Всего должностей:</strong> {positions.length}
                    </Box>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Название должности</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPositions.map((pos) => (
                            <TableRow key={pos.id}>
                                <TableCell>{pos.id}</TableCell>
                                {editMode === pos.id ? (
                                    <TableCell>
                                        <TextField
                                            name="name"
                                            value={editedPosition.name}
                                            onChange={handleEditChange}
                                            size="small"
                                            fullWidth
                                        />
                                    </TableCell>
                                ) : (
                                    <TableCell>{pos.name}</TableCell>
                                )}
                                <TableCell align="right">
                                    {editMode === pos.id ? (
                                        <>
                                            <Tooltip title="Сохранить">
                                                <IconButton color="success" onClick={() => handleSaveClick(pos.id)}>
                                                    <SaveIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Отмена">
                                                <IconButton color="error" onClick={handleCancel}>
                                                    <CancelIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <>
                                            <Tooltip title="Редактировать">
                                                <IconButton color="primary" onClick={() => handleEditClick(pos)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Удалить">
                                                <IconButton color="error" onClick={() => handleOpenDialog(pos.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {adding ? (
                            <TableRow>
                                <TableCell>—</TableCell>
                                <TableCell>
                                    <TextField
                                        name="name"
                                        value={newPosition.name}
                                        onChange={onInputChange}
                                        size="small"
                                        fullWidth
                                        placeholder="Введите название должности"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Сохранить">
                                        <IconButton color="success" onClick={handleAddSave}>
                                            <SaveIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Отмена">
                                        <IconButton color="error" onClick={handleCancel}>
                                            <CancelIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <TableRow
                                hover
                                onClick={handleAddClick}
                                sx={{
                                    cursor: 'pointer',
                                    backgroundColor: '#f9f9f9',
                                    '&:hover': { backgroundColor: '#f0f0f0' }
                                }}
                            >
                                <TableCell colSpan={3} align="center">
                                    <AddIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    <span style={{ fontStyle: 'italic', color: '#555' }}>
                                        Добавить новую должность
                                    </span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    Вы уверены, что хотите удалить эту должность?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Отмена</Button>
                    <Button onClick={() => handleDelete(positionIdToDelete!)} color="error">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PositionTable;

