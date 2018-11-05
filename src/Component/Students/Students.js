import React, {Component, PureComponent} from 'react';
import StudentsApi from './StudentsApi';
import StudentsTable from './StudentsTable';
import PageLoader from '../Utils/PageLoader';
import { withStyles } from '@material-ui/core/styles';
import StudentsTableControl from './StudentsTableControl';
import AddNewButton from "../Utils/AddNewButton";
import {Link} from "react-router-dom";

const styles = theme => ({
    button: {
        float: 'right',
        marginRight: '10px',
        marginBottom: '25px'
    },

    tableContainer: {
        marginTop: '25px',
    }


});

class Students extends PureComponent{
    constructor(props) {
        super(props);
        this.state ={
            pageNum: 1,
            pageSize: 10,
            totalPage: 1,
            students: [],
            currentPage: 1,
            isLoading: true,
        }
    }

    // async componentDidMount() {
    //     const data = await StudentsApi.getStudentsPageSize();
    //     this.setState({
    //         pageSize: data.pageSize,
    //     })
    // }

    changeCurrentPage = (page) => {
        let newCurrentPage = page + 1;
        this.setState({
            currentPage: newCurrentPage,
            isLoading: true,
        })
    };

    async componentDidMount() {
        const data = await StudentsApi.getStudentsByPage(1);
        if (data.statusCode >= 200 && data.statusCode <= 300) {
            const { students, pageNum, pageSize, totalPage } = data;
            this.setState({
                pageNum: pageNum,
                pageSize: pageSize,
                students: students,
                totalPage: totalPage,
                isLoading: false,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        let {currentPage} = this.state;
        if (prevState.currentPage !== this.state.currentPage) {
            const data = await StudentsApi.getStudentsByPage(currentPage);
            if (data.statusCode >= 200 && data.statusCode <= 300) {
                const { students } = data;
                console.log({...students, isLoading: false});
                this.setState({
                    students: students,
                    isLoading: false
                });
            }
        }
    }

    render() {
        const {isLoading, students, pageSize, currentPage} = this.state;
        const {classes} = this.props;

        return (
            <div>
                {!isLoading && <Link to='/students/create' style={{textDecoration: 'none'}}>
                    <div className={classes.button}>
                        <AddNewButton name='Add new student' />
                    </div>
                </Link>}
                {isLoading && <PageLoader/>}
                {!isLoading && students.length >0 && <div>
                    <StudentsTable students = {students}/>
                    <StudentsTableControl pageSize={pageSize} page={currentPage - 1} changeCurrentPage={this.changeCurrentPage}/>
                </div>}
            </div>
        );
    }
}

export default withStyles(styles)(Students);