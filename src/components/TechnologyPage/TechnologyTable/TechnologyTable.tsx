import React, { useState } from 'react';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Paper, IconButton, TextField,
    Dialog, DialogActions, DialogContent, DialogTitle, Button, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {Technology} from "../../../types/Technology";


interface Props {
    technologies: Technology[];
    newTechnology: Omit<Technology, 'id'>;
    onEdit: (id: number, updated: Omit<Technology, 'id'>) => void;
    onDelete: (id: number) => void;
    onAdd: (newTechnology: Omit<Technology, 'id'>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TechnologyTable: React.FC<Props> = ({
                                              technologies,
                                              newTechnology,
                                              onEdit,
                                              onDelete,
                                              onAdd,
                                              onInputChange
                                          }) => {
    const [editMode, setEditMode] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [editedTechnology, setEditedTechnology] = useState<Omit<Technology, 'id'>>({ name: '', description: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [techIdToDelete, setTechIdToDelete] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredTechnologies = technologies.filter(tech =>
        tech.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEditClick = (tech: Technology) => {
        setEditMode(tech.id);
        setEditedTechnology({ name: tech.name, description: tech.description });
    };

    const handleAddClick = () => {
        setAdding(true);
    };

    const handleAddSave = () => {
        if (!newTechnology.name || !newTechnology.description) {
            console.error('Название и описание обязательны!');
            return;
        }
        onAdd(newTechnology);
        setAdding(false);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTechnology(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = (id: number) => {
        onEdit(id, editedTechnology);
        setEditMode(null);
    };

    const handleCancel = () => {
        setEditMode(null);
        setAdding(false);
    };

    const handleOpenDialog = (id: number) => {
        setTechIdToDelete(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTechIdToDelete(null);
    };

    const handleDelete = (id: number) => {
        if (id !== null) {
            onDelete(id);
            setOpenDialog(false);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="Поиск технологий"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                />
            </Box>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Описание</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTechnologies.map((tech) => (
                            <TableRow key={tech.id}>
                                <TableCell>{tech.id}</TableCell>
                                {editMode === tech.id ? (
                                    <>
                                        <TableCell>
                                            <TextField
                                                name="name"
                                                value={editedTechnology.name}
                                                onChange={handleEditChange}
                                                size="small"
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name="description"
                                                value={editedTechnology.description}
                                                onChange={handleEditChange}
                                                size="small"
                                                fullWidth
                                            />
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{tech.name}</TableCell>
                                        <TableCell>{tech.description}</TableCell>
                                    </>
                                )}
                                <TableCell align="right">
                                    {editMode === tech.id ? (
                                        <>
                                            <IconButton color="success" onClick={() => handleSaveClick(tech.id)}>
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={handleCancel}>
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton color="primary" onClick={() => handleEditClick(tech)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleOpenDialog(tech.id)}>
                                                <DeleteIcon />
                                            </IconButton>
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
                                        value={newTechnology.name}
                                        onChange={onInputChange}
                                        size="small"
                                        fullWidth
                                        placeholder="Введите название"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        name="description"
                                        value={newTechnology.description}
                                        onChange={onInputChange}
                                        size="small"
                                        fullWidth
                                        placeholder="Введите описание"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="success" onClick={handleAddSave}>
                                        <SaveIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={handleCancel}>
                                        <CancelIcon />
                                    </IconButton>
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
                                <TableCell colSpan={4} align="center">
                                    <AddIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    <span style={{ fontStyle: 'italic', color: '#555' }}>
                                        Добавить новую технологию
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
                    Вы уверены, что хотите удалить эту технологию?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Отмена</Button>
                    <Button
                        onClick={() => handleDelete(techIdToDelete!)}
                        color="error"
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TechnologyTable;
