// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import {Paper, Button } from '@material-ui/core';
// import Moment from 'moment';
// import { Link } from 'react-router-dom';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import TableData from "../Utils/TableData";
// import StudentsApi from "./StudentsApi";
// import TableControl from "../Utils/TableControl";
//
// const styles = theme => ({
//     root: {
//         width: '100%',
//         marginTop: theme.spacing.unit * 3,
//         overflowX: 'auto',
//         textAlign: 'center',
//         minHeight: '500px',
//         marginBottom: 0,
//     },
//     table: {
//         minWidth: 750,
//     },
//     detailsButton: {
//         paddingRight: 0,
//     }
// });
//
// const StudentsTableCell = withStyles(theme => ({
//     head: {
//         backgroundColor: '#1D8BF1',
//         color: theme.palette.common.white,
//         fontSize: 16,
//     },
//     body: {
//         fontSize: 14,
//     },
// }))(TableCell);
//
// class StudentsTable extends Component {
//     constructor(props) {
//         super(props);
//         this.state = ({
//             page: 0,
//         })
//     }
//
//     changeCurrentPage = (page) => {
//         this.setState({
//             page: page
//         })
//     };
//
//
//     render() {
//         const { students } = this.props;
//         const { page } = this.state;
//         const pageSize = 10;
//         const count = 201;
//
//         return (
//             <div>
//                 <TableData
//                     tableParams={students}
//                     tableHeadArray={['Name', 'Email', 'Gender', 'Date of Birth', 'Credit']}
//                     tableBodyArray={['name', 'email', 'gender', 'DOB', 'credit']}
//                     tableName='student'
//                     page={0}
//                     pageSize={pageSize}
//                     tableApiDeleteMethod={StudentsApi.deleteStudent}
//                 />
//                 <TableControl
//                     count={count}
//                     page={page}
//                     pageSize={pageSize}
//                     changeCurrentPage={this.changeCurrentPage}
//                 />
//             </div>
//             {/*<Paper className={classes.root}>*/}
//                 {/*<Table className={classes.table}>*/}
//                     {/*<TableHead>*/}
//                         {/*<TableRow>*/}
//                             {/*<StudentsTableCell padding='dense' numeric={true}>Name</StudentsTableCell>*/}
//                             {/*<StudentsTableCell padding='dense' numeric>Email</StudentsTableCell>*/}
//                             {/*<StudentsTableCell padding='dense' numeric>Gender</StudentsTableCell>*/}
//                             {/*<StudentsTableCell padding='dense' numeric>Date of birth</StudentsTableCell>*/}
//                             {/*<StudentsTableCell padding='dense' numeric>Credit</StudentsTableCell>*/}
//                             {/*<StudentsTableCell padding='dense' numeric>Details</StudentsTableCell>*/}
//                         {/*</TableRow>*/}
//                     {/*</TableHead>*/}
//                     {/*<TableBody>*/}
//                         {/*{students.map(student => {*/}
//                             {/*return (*/}
//                                 {/*<TableRow key={student.id}>*/}
//                                     {/*<TableCell padding='dense' component="th" scope="row" numeric={true}>*/}
//                                         {/*{student.name}*/}
//                                     {/*</TableCell>*/}
//                                     {/*<TableCell padding='dense' numeric>{student.email}</TableCell>*/}
//                                     {/*<TableCell padding='dense' numeric>{student.gender}</TableCell>*/}
//                                     {/*<TableCell padding='dense' numeric>{Moment(student.DOB).format("MMM DD YYYY")}</TableCell>*/}
//                                     {/*<TableCell padding='dense' numeric>{student.credit}</TableCell>*/}
//                                     {/*<TableCell padding='dense' numeric>*/}
//                                         {/*<Link to={`students/${student.id}`} style={{textDecoration: 'none'}}>*/}
//                                             {/*<Button className={classes.detailsButton}><MoreVertIcon/></Button>*/}
//                                         {/*</Link>*/}
//                                     {/*</TableCell>*/}
//                                 {/*</TableRow>*/}
//                             {/*);*/}
//                         {/*})}*/}
//                     {/*</TableBody>*/}
//                 {/*</Table>*/}
//             {/*</Paper>*/}
//         )
//     }
//
// }
//
//
// StudentsTable.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
//
// export default withStyles(styles)(StudentsTable);
