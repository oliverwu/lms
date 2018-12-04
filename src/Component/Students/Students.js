import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import PageLoader from '../Utils/PageLoader';
import MenuBar from '../Layout/MenuBar';
import TableData from "../Utils/TableData";
import TableControl from "../Utils/TableControl";
import { connect } from 'react-redux';
import {
    clearStudentsData,
    handleDeleteStudentData,
    handleReceivedStudentsDataByPage
} from "../../Actions/StudentsActions";
import ForbidErrorDialog from "../Utils/ForbidErrorDialog";

const state = state => {
    return {
        pageNum: state.students.pageNum,
        pageSize: state.students.pageSize,
        totalPage: state.students.totalPage,
        students: state.students.students,
        isLoading: state.students.isLoading,
        amount: state.students.amount,
        statusCode: state.students.statusCode,
        studentStatusCode: state.student.statusCode,
    }
};

class Students extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            forbidErrorDialogStatus: false,
            errorStatusCode: null,
        }
    }

    componentWillMount() {
        this.props.dispatch(clearStudentsData())
    }

    async componentDidMount() {
        await this.props.dispatch(handleReceivedStudentsDataByPage(this.props.pageSize, this.props.pageNum));
        console.log(this.props);
        this.props.statusCode > 300 && this.setState({
            forbidErrorDialogStatus: true,
            errorStatusCode: this.props.statusCode,
        })
    }

    handleDeleteStudent = async (id) => {
        await this.props.dispatch(handleDeleteStudentData(id));
        if (this.props.studentStatusCode > 300) {
            this.setState({
                forbidErrorDialogStatus: true,
                errorStatusCode: this.props.studentStatusCode,
            })
        } else {
            const { pageSize, pageNum } = this.props;
            this.props.dispatch(clearStudentsData());
            this.props.dispatch(handleReceivedStudentsDataByPage(pageSize, pageNum))
        }
    };

    changeCurrentPage = (page) => {
        console.log(page);
        let pageNum = page + 1;
        this.props.dispatch(clearStudentsData());
        this.props.dispatch(handleReceivedStudentsDataByPage(this.props.pageSize, pageNum))
    };

    handleChangePageSize = (pageSize, pageNum) => {
        this.props.dispatch(clearStudentsData());
        this.props.dispatch(handleReceivedStudentsDataByPage(pageSize, pageNum));
    };

    handleForbidErrorDialogClose = () => {
        this.setState({
            forbidErrorDialogStatus: false,
        })
    };


    render() {
        const { forbidErrorDialogStatus, errorStatusCode } = this.state;
        const {isLoading, students, pageSize, pageNum, amount} = this.props;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Students' menu='Students' name='student'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && students && <div>
                        <TableData
                            tableParams={students}
                            tableHeadArray={['Name', 'Email', 'Gender', 'Date of Birth', 'Credit', '']}
                            tableBodyArray={['name', 'email', 'gender', 'dateOfBirth', 'credit']}
                            tableName='student'
                            page={0}
                            pageSize={pageSize}
                            tableElementDeleteMethod={this.handleDeleteStudent}
                            minWidth='800px'
                        />
                        <TableControl
                            handleChangePageSize={this.handleChangePageSize}
                            count={amount}
                            page={pageNum - 1}
                            pageSize={pageSize}
                            changeCurrentPage={this.changeCurrentPage}
                        />
                    </div>}
                </MenuBar>
                <ForbidErrorDialog
                    forbidErrorDialogStatus = { forbidErrorDialogStatus }
                    statusCode={ errorStatusCode }
                    handleForbidErrorDialogClose={this.handleForbidErrorDialogClose}
                />
            </Fragment>
        );
    }
}

export default connect(state)(Students);