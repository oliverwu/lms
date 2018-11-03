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

class StudentsTable extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isLoading: true,
    //         students: [],
    //         error: ''
    //     }
    // }

    // async componentDidMount() {
    //     const data = await StudentApi.getStudentsByPage(this.props.pageNum);
    //     if (data.statusCode >= 200 && data.statusCode <= 300) {
    //         const students = data.students;
    //         this.setState({
    //             students: students,
    //             isLoading: false,
    //         })
    //     }
    // }

    render() {
        const { classes, students} = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell numeric={true}>Name</TableCell>
                            <TableCell numeric>Email</TableCell>
                            <TableCell numeric>Gender</TableCell>
                            <TableCell numeric>Date of birth</TableCell>
                            <TableCell numeric>Credit</TableCell>
                            <TableCell numeric>Details</TableCell>
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
