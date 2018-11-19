import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import StudentsApi from './StudentsApi';
import PageLoader from '../Utils/PageLoader';
import MenuBar from '../Layout/MenuBar';
import TableData from "../Utils/TableData";
import TableControl from "../Utils/TableControl";
import { connect } from 'react-redux';
import {clearStudentsData, handleReceivedStudentsDataByPage} from "../../Actions/StudentsActions";
import ForbidErrorDialog from "../Utils/ForbidErrorDialog";

const state = state => {
    return {
        pageNum: state.students.pageNum,
        pageSize: state.students.pageSize,
        totalPage: state.students.totalPage,
        students: state.students.students,
        isLoading: state.students.isLoading,
        count: state.students.count,
    }
};

class Students extends PureComponent{
    changeCurrentPage = (page) => {
        let pageNum = page + 1;
        this.props.dispatch(handleReceivedStudentsDataByPage(pageNum))
    };

    clearData = () => {
        this.props.dispatch(clearStudentsData())
    };

    async componentDidMount() {
        console.log(this.props.pageNum);
        this.props.dispatch(handleReceivedStudentsDataByPage(this.props.pageNum))
    }


    render() {
        const {isLoading, students, pageSize, pageNum, count} = this.props;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar selected='Students' menu='Students' name='student'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && !students && <ForbidErrorDialog clearData={this.clearData}/>}
                    {!isLoading && students && <div>
                        <TableData
                            tableParams={students}
                            tableHeadArray={['Name', 'Email', 'Gender', 'Date of Birth', 'Credit', '']}
                            tableBodyArray={['name', 'email', 'gender', 'DOB', 'credit']}
                            tableName='student'
                            page={0}
                            pageSize={pageSize}
                            tableApiDeleteMethod={StudentsApi.deleteStudent}
                            minWidth='800px'
                        />
                        <TableControl
                            count={count}
                            page={pageNum - 1}
                            pageSize={pageSize}
                            changeCurrentPage={this.changeCurrentPage}
                        />
                    </div>}
                </MenuBar>
            </Fragment>

        );
    }
}

export default connect(state)(Students);