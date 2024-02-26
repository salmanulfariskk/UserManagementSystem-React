import { Link as RouterLink } from 'react-router-dom';

import { deleteUser } from '../../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { initializeAdmin } from '../../../redux/slices/adminSlice';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PenIcon from '@mui/icons-material/ModeEditOutline';

import './Dashboard.css';

// table styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TableComponent({ data }) {
    const loading = useSelector(state => state.admin.loading);
    const dispatch = useDispatch();

    const deleteThisUser = async (id) => {
        let response = await deleteUser({ id: id });
        if (response && response.data.status === "success") {
            dispatch(initializeAdmin());
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Phone</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading &&
                        <TableRow>
                            <TableCell>Loading...</TableCell>
                        </TableRow>
                    }
                    {data.length === 0 &&
                        <TableRow>
                            <TableCell>No data found</TableCell>
                        </TableRow>
                    }
                    {data.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.username}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.phone}</StyledTableCell>
                            <StyledTableCell align="right">
                                <RouterLink
                                    to={`/admin/edit-user/${row._id}`}
                                    variant="body2"
                                    style={{ marginRight: '10px', textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Button variant="outlined" startIcon={<PenIcon />}
                                        style={{ marginRight: '10px' }}>Edit</Button>
                                </RouterLink>
                                <Button variant="outlined" color="error"
                                    startIcon={<DeleteIcon />} onClick={() => deleteThisUser(row._id)}
                                >
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
