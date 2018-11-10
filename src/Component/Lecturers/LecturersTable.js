import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Button, TableFooter, MenuItem, Menu} from '@material-ui/core';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteDialog from "../Utils/DeleteDialog";
import LecturersApi from "./LecturersApi";

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        // color: theme.palette.text.Primary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

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
        // minWidth: '100px',
        marginTop: theme.spacing.unit * 3,
        // overflowX: 'auto',
        // overflowY: 'auto',
        textAlign: 'center',

        // minHeight: '500px',
        marginBottom: 0,
    },
    table: {
        minWidth: '600px'
        // minWidth: '300px',
        // textAlign: 'right',
    },
    detailsButton: {
        paddingRight: 0,
    },
    tableWrapper: {
        overflowX: 'auto',
    }
});

class TablePaginationActions extends React.Component {

    handleFirstPageButtonClick = event => {
        this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = event => {
        this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = event => {
        this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = event => {
        this.props.onChangePage(
            event,
            Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
        );
    };

    render() {
        const { classes, count, page, rowsPerPage, theme } = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    <FirstPageIcon />
                </IconButton>
                <IconButton
                    onClick={this.handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Previous Page"
                >
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
    TablePaginationActions,
);


class LecturersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            deleteDialogStatus: false,
            detailsMenuAnchorEl: null,
        }
    }

    handleChangePage = (event, page) => {
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

        const pageSize = 10;
        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
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
                            {lecturers.slice(page*10, page*10 + 10).map(lecturer => {
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
                                                deleteDialogStatus={deleteDialogStatus}
                                                handleDeleteDialogClose={this.handleDeleteDialogClose}
                                                content='lecturer'
                                                handleDelete={this.handleDelete.bind(this, lecturer.id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    // colSpan={3}
                                    count={lecturers.length}
                                    rowsPerPage={pageSize}
                                    rowsPerPageOptions={[pageSize]}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>

                </div>

            </Paper>
        );
    }

}


LecturersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LecturersTable);
