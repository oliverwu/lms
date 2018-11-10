import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Button, MenuItem, Menu} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteDialog from "../Utils/DeleteDialog";
import LecturersApi from "./LecturersApi";
import TableControl from "../Utils/TableControl";

const LecturersTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#1D8BF1',
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        textAlign: 'center',
        marginBottom: 0,
    },
    table: {
        minWidth: '600px'
    },
    detailsButton: {
        paddingRight: 0,
    },
    tableWrapper: {
        overflowX: 'auto',
    }
});


class LecturersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            deleteDialogStatus: false,
            detailsMenuAnchorEl: null,
        }
    }

    changeCurrentPage = (page) => {
        this.setState({
            page:page,
        })
    };

    handleDetailsMenuClose = () => {
        this.setState({
            detailsMenuAnchorEl: null
        })
    };

    handleDetailsMenuOpen = (e) => {
        this.setState({
            detailsMenuAnchorEl: e.currentTarget,
        })
    };

    handleDeleteDialogClose = () => {
        this.setState({
            deleteDialogStatus: false
        })
    };

    handleDeleteDialogOpen = () => {
        this.setState({
            deleteDialogStatus: true
        })
    };

    handleDelete = async (id) => {
        const statusCode = await LecturersApi.deleteLecturer(id);
        if (statusCode === 204) {
            window.location.reload();
        }
    };


    render() {
        const { classes, lecturers } = this.props;
        const { page, detailsMenuAnchorEl, deleteDialogStatus } = this.state;
        const detailsMenuOpen = Boolean(detailsMenuAnchorEl);

        const pageSize = 5;
        return (
            <div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <LecturersTableCell numeric={true}>Name</LecturersTableCell>
                                <LecturersTableCell numeric>Email</LecturersTableCell>
                                <LecturersTableCell numeric>Staff Number</LecturersTableCell>
                                <LecturersTableCell numeric>Details</LecturersTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lecturers.slice(page*pageSize, page*pageSize + pageSize).map(lecturer => {
                                return (
                                    <TableRow key={lecturer.id}>
                                        <TableCell component="th" scope="row" numeric={true}>
                                            {lecturer.name}
                                        </TableCell>
                                        <TableCell numeric>{lecturer.email}</TableCell>
                                        <TableCell numeric>{lecturer.staffNumber}</TableCell>
                                        <TableCell numeric>
                                            <Button className={classes.detailsButton} onClick={this.handleDetailsMenuOpen}>
                                                <MoreVertIcon/>
                                            </Button>
                                            <Menu
                                                open={detailsMenuOpen}
                                                anchorEl={detailsMenuAnchorEl}
                                                onClose={this.handleDetailsMenuClose}
                                                PaperProps={{
                                                    style: {
                                                        width: 200,
                                                    }
                                                }}
                                            >
                                                <MenuItem key='delete' onClick={this.handleDeleteDialogOpen}>Delete</MenuItem>
                                                <Link to={`lecturers/${lecturer.id}`} style={{textDecoration: 'none', width: '100%'}}>
                                                    <MenuItem key='details' >Details</MenuItem>
                                                </Link>
                                            </Menu>
                                            {console.log(deleteDialogStatus)}
                                            <DeleteDialog
                                                id={lecturer.id}
                                                deleteDialogStatus={deleteDialogStatus}
                                                handleDeleteDialogClose={this.handleDeleteDialogClose}
                                                content='lecturer'
                                                handleDelete={this.handleDelete}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <TableControl
                    count={lecturers.length}
                    page={page}
                    pageSize={pageSize}
                    changeCurrentPage={this.changeCurrentPage}
                />
            </div>
        );
    }

}


LecturersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LecturersTable);
