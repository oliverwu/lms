import React, {Component} from 'react';
import StudentApi from './StudentsApi';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, Button } from '@material-ui/core';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import DetailsIcon from '@material-ui/icons/Details'
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        textAlign: 'center',
        minHeight: '500px',
        marginBottom: 0,
    },
    table: {
        minWidth: 500,
        // textAlign: 'right',
    },
    detailsButton: {
        paddingRight: 0,
    }
});

const StudentsTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#1D8BF1',
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class StudentsTable extends Component {



    render() {
        const { classes, students} = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StudentsTableCell numeric={true}>Name</StudentsTableCell>
                            <StudentsTableCell numeric>Email</StudentsTableCell>
                            <StudentsTableCell numeric>Gender</StudentsTableCell>
                            <StudentsTableCell numeric>Date of birth</StudentsTableCell>
                            <StudentsTableCell numeric>Credit</StudentsTableCell>
                            <StudentsTableCell numeric>Details</StudentsTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map(student => {
                            return (
                                <TableRow key={student.id}>
                                    <TableCell component="th" scope="row" numeric={true}>
                                        {student.name}
                                    </TableCell>
                                    <TableCell numeric>{student.email}</TableCell>
                                    <TableCell numeric>{student.gender}</TableCell>
                                    <TableCell numeric>{Moment(student.DOB).format("MMM DD YYYY")}</TableCell>
                                    <TableCell numeric>{student.credit}</TableCell>
                                    <TableCell numeric>
                                        <Link to={`students/${student.id}`} style={{textDecoration: 'none'}}>
                                            <Button className={classes.detailsButton}><MoreVertIcon/></Button>
                                            {/*<TableCell numeric>{'Details'}</TableCell>*/}
                                        </Link>
                                    </TableCell>


                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

}


StudentsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentsTable);
