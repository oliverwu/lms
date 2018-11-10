import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import {Paper, TableFooter } from '@material-ui/core';
import TablePagination from "@material-ui/core/TablePagination/TablePagination";
import IconButton from "@material-ui/core/IconButton/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        // color: theme.palette.text.Primary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: 0,
    },
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
        const { classes, count, page, rowsPerPage } = this.props;

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


class TableControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }

    handleChangePage = (event, page) => {
        this.setState({
            page:page,
        })
    };


    render() {
        const { classes, length } = this.props;
        const { page } = this.state;

        const pageSize = 10;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                // colSpan={3}
                                count={length}
                                rowsPerPage={pageSize}
                                rowsPerPageOptions={[pageSize]}
                                page={page}
                                onChangePage={this.handleChangePage}
                                ActionsComponent={TablePaginationActionsWrapped}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

TableControl.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableControl);
