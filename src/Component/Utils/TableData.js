import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Button } from '@material-ui/core';
import DeleteDialog from "../Utils/DeleteDialog";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import {redirect} from "./Help";

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

    detailsButton: {
        padding: 0,
    },

    tableBodyRow: {
        '&:hover': {
            background: '#DBDBDB',
            color: 'white',
            cursor: 'grab',
        },
    }
});


class TableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            deleteDialogStatus: false,
            currentId: '',
        }
    }



    handleDeleteDialogClose = () => {
        this.setState({
            deleteDialogStatus: false
        })
    };

    handleDeleteDialogOpen = (e) => {
        e.stopPropagation();
        this.setState({
            deleteDialogStatus: true,
            currentId: e.currentTarget.id,
        })
    };

    handleDelete = async (id) => {
        const { tableApiDeleteMethod } = this.props;
        const statusCode = await tableApiDeleteMethod(id);
        if (statusCode >= 200 && statusCode < 300) {
            window.location.reload();
        }
    };

    handleClickTableBodyRow = (e) => {
        e.stopPropagation();
        redirect(`${this.props.tableName}s/${e.currentTarget.id}`);
    };


    render() {
        const { classes, tableParams, tableHeadArray, tableBodyArray, tableName, page, pageSize, minWidth } = this.props;
        const { deleteDialogStatus, currentId } = this.state;


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
                                <TableRow id={tableParam.id} key={tableParam.id} className={classes.tableBodyRow} onClick={this.handleClickTableBodyRow}>
                                    {tableBodyArray.map(item => {
                                        return <TableCell padding='dense' numeric key={item}>{tableParam[item]}</TableCell>
                                    })}
                                    <TableCell numeric>
                                        <Button className={classes.detailsButton} id={tableParam.id} onClick={this.handleDeleteDialogOpen}>
                                            <DeleteOutline/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
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
