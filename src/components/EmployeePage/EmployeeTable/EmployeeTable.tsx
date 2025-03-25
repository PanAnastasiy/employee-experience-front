import React, {useState} from 'react';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Paper, Avatar, IconButton, TextField,
    Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import {Employee} from '../../../types/Employee';
import Box from "@mui/material/Box";
import {SnackbarMessage} from "../../SnackBarMessage/SnackBarMessage";

interface Props {
    employees: Employee[];
    newEmployee: Omit<Employee, 'id' | 'fullName'>;
    onEdit: (id: number, updated: Omit<Employee, 'id' | 'fullName'>) => void;
    onDelete: (id: number) => void;
    onAdd: (newEmployee: Omit<Employee, 'id' | 'fullName'>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeTable: React.FC<Props> = ({
                                            employees,
                                            newEmployee,
                                            onEdit,
                                            onDelete,
                                            onAdd,
                                            onInputChange
                                        }) => {
    const [editMode, setEditMode] = useState<number | null>(null);
    const [adding, setAdding] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState<Omit<Employee, 'id' | 'fullName'>>({
        firstName: '',
        lastName: '',
        email: '',
        hireDate: '',
        photoUrl: ''
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [employeeIdToDelete, setEmployeeIdToDelete] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredEmployees = employees.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        const email = emp.email.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
    });

    const handleEditClick = (emp: Employee) => {
        setEditMode(emp.id);
        setEditedEmployee({
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            hireDate: emp.hireDate,
            photoUrl: emp.photoUrl || ''
        });
    };

    const handleAddClick = () => {
        setAdding(true);
    };

    const handleAddSave = () => {
        if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.hireDate) {
            console.error('Все поля должны быть заполнены!');
            return;
        }
        onAdd(newEmployee);
        setAdding(false);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedEmployee(prev => ({...prev, [name]: value}));
    };

    const handleSaveClick = (id: number) => {
        onEdit(id, editedEmployee);
        setEditMode(null);
    };

    const handleCancel = () => {
        setEditMode(null);
        setAdding(false);
    };

    const handleOpenDialog = (id: number) => {
        setEmployeeIdToDelete(id);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEmployeeIdToDelete(null);
    };

    const handleDelete = (id: number) => {
        if (id !== null) {
            onDelete(id);
            setOpenDialog(false);
        }
    };

    return (
        <>
            <Box sx={{display: 'flex', gap: 2, mb: 2}}>
                <TextField
                    label="Поиск"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                />
                <TextField
                    label="Проект"
                    variant="outlined"
                    fullWidth
                    select
                >
                    <MenuItem value="projectA">1</MenuItem>
                    <MenuItem value="projectB">2</MenuItem>
                    <MenuItem value="projectC">3</MenuItem>
                </TextField>
                <TextField
                    label="Навыки"
                    variant="outlined"
                    fullWidth
                    select
                >
                    <MenuItem value="frontend">Frontend</MenuItem>
                    <MenuItem value="backend">Backend</MenuItem>
                    <MenuItem value="devops">DevOps</MenuItem>
                </TextField>
                <TextField
                    label="Должность"
                    variant="outlined"
                    fullWidth
                    select
                >
                    <MenuItem value="junior">Junior</MenuItem>
                    <MenuItem value="middle">Middle</MenuItem>
                    <MenuItem value="senior">Senior</MenuItem>
                </TextField>
            </Box>

            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 600,
                    minWidth: 1000,  // Установите минимальную ширину таблицы
                    overflow: 'auto', // Добавляем прокрутку при необходимости
                }}
            >
                <Table stickyHeader size="small" sx={{ fontSize: '0.875rem', tableLayout: 'auto' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ minWidth: 30, padding: '8px', wordWrap: 'break-word' }}>ID</TableCell>
                            <TableCell sx={{ minWidth: 50, padding: '8px', wordWrap: 'break-word' }}>Фото</TableCell>
                            <TableCell sx={{ minWidth: 100, padding: '8px', wordWrap: 'break-word' }}>Имя</TableCell>
                            <TableCell sx={{ minWidth: 100, padding: '8px', wordWrap: 'break-word' }}>Фамилия</TableCell>
                            <TableCell sx={{ minWidth: 150, padding: '8px', wordWrap: 'break-word' }}>Email</TableCell>
                            <TableCell sx={{ minWidth: 100, padding: '8px', wordWrap: 'break-word' }}>Дата найма</TableCell>
                            <TableCell sx={{ minWidth: 30, padding: '8px', textAlign: 'right', wordWrap: 'break-word' }}>Профиль</TableCell>
                            <TableCell sx={{ minWidth: 60, padding: '8px', textAlign: 'right', wordWrap: 'break-word' }}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell sx={{ wordWrap: 'break-word' }}>{emp.id}</TableCell>
                                <TableCell>
                                    <Avatar src={`/static/images/employees/photo${emp.id}.jpg`} />
                                </TableCell>
                                {editMode === emp.id ? (
                                    <>
                                        <TableCell>
                                            <TextField name="firstName" value={editedEmployee.firstName} onChange={handleEditChange} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="lastName" value={editedEmployee.lastName} onChange={handleEditChange} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="email" value={editedEmployee.email} onChange={handleEditChange} size="small" />
                                        </TableCell>
                                        <TableCell>
                                            <TextField name="hireDate" type="date" value={editedEmployee.hireDate} onChange={handleEditChange} size="small" />
                                        </TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>{emp.firstName}</TableCell>
                                        <TableCell>{emp.lastName}</TableCell>
                                        <TableCell>{emp.email}</TableCell>
                                        <TableCell>{emp.hireDate}</TableCell>
                                    </>
                                )}
                                <TableCell>
                                    <IconButton color="primary" onClick={() => alert(`Открываем профиль сотрудника №${emp.id}`)}>
                                        <OpenInNewIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    {editMode === emp.id ? (
                                        <>
                                            <IconButton color="success" onClick={() => handleSaveClick(emp.id)}>
                                                <SaveIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={handleCancel}>
                                                <CancelIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <>
                                            <IconButton color="primary" onClick={() => handleEditClick(emp)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleOpenDialog(emp.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* Добавление нового сотрудника */}
                        {adding ? (
                            <TableRow>
                                <TableCell>—</TableCell>
                                <TableCell>
                                    <Avatar src={newEmployee.photoUrl || '/static/images/default-avatar.png'} />
                                </TableCell>
                                <TableCell>
                                    <TextField name="firstName" value={newEmployee.firstName} onChange={onInputChange} size="small" />
                                </TableCell>
                                <TableCell>
                                    <TextField name="lastName" value={newEmployee.lastName} onChange={onInputChange} size="small" />
                                </TableCell>
                                <TableCell>
                                    <TextField name="email" value={newEmployee.email} onChange={onInputChange} size="small" />
                                </TableCell>
                                <TableCell>
                                    <TextField name="hireDate" type="date" value={newEmployee.hireDate} onChange={onInputChange} size="small" />
                                </TableCell>
                                <TableCell />
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
                                    borderTop: '1px dashed gray',
                                    cursor: 'pointer',
                                    backgroundColor: '#f9f9f9',
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0'
                                    }
                                }}
                            >
                                <TableCell colSpan={8} align="center">
                                    <AddIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                                    <span style={{ fontStyle: 'italic', color: '#555' }}>Добавить нового сотрудника</span>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>



            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <p>Вы уверены, что хотите удалить этого сотрудника?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Нет
                    </Button>
                    <Button onClick={() => handleDelete(employeeIdToDelete!)} color="secondary">
                        Да
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default EmployeeTable;
