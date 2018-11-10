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

const CustomTableCell = withStyles(theme => ({
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
        // minWidth: '600px',
    },
    detailsButton: {
        paddingRight: 0,
    },
});


class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            deleteDialogStatus: false,
            detailsMenuAnchorEl: null,
            currentId: '',
        }
    }

    handleDetailsMenuClose = () => {
        this.setState({
            detailsMenuAnchorEl: null
        })
    };

    handleDetailsMenuOpen = (e) => {
        this.setState({
            detailsMenuAnchorEl: e.currentTarget,
            currentId: e.currentTarget.id,
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
        const { tableApiDeleteMethod } = this.props;
        const statusCode = await tableApiDeleteMethod(id);
        if (statusCode >= 200 && statusCode < 300) {
            window.location.reload();
        }
    };


    render() {
        const { classes, tableParams, tableHeadArray, tableBodyArray, tableName, page, pageSize, minWidth } = this.props;
        const { detailsMenuAnchorEl, deleteDialogStatus, currentId } = this.state;
        const detailsMenuOpen = Boolean(detailsMenuAnchorEl);

        return (
            <Paper className={classes.root}>
                <Table className={classes.table} style={{minWidth: minWidth}}>
                    <TableHead>
                        <TableRow>
                            {tableHeadArray.map((item) => {
                                return <CustomTableCell padding='dense' numeric key={item}>{item}</CustomTableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableParams.slice(page*pageSize, page*pageSize + pageSize).map(tableParam => {
                            return (
                                <TableRow key={tableParam.id}>
                                    {tableBodyArray.map(item => {
                                        return <TableCell padding='dense' numeric key={item}>{tableParam[item]}</TableCell>
                                    })}
                                    <TableCell numeric>
                                        <Button className={classes.detailsButton} id={tableParam.id} onClick={this.handleDetailsMenuOpen}>
                                            <MoreVertIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
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
                    <Link to={`${tableName}s/${currentId}`} style={{textDecoration: 'none', width: '100%'}}>
                        <MenuItem key='details' >Details</MenuItem>
                    </Link>
                </Menu>
                <DeleteDialog
                    id={currentId}
                    deleteDialogStatus={deleteDialogStatus}
                    handleDeleteDialogClose={this.handleDeleteDialogClose}
                    content={tableName}
                    handleDelete={this.handleDelete}
                />
            </Paper>
        );
    }

}


TableData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableData);
