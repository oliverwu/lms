import React, {Component, PureComponent} from 'react';
import StudentsApi from './StudentsApi';
import PageLoader from '../Utils/PageLoader';
import MenuBar from '../Layout/MenuBar';
import TableData from "../Utils/TableData";
import TableControl from "../Utils/TableControl";

class Students extends PureComponent{
    constructor(props) {
        super(props);
        this.state ={
            pageNum: 1,
            pageSize: 10,
            totalPage: 1,
            students: [],
            // currentPage: 1,
            isLoading: true,
        }
    }

    changeCurrentPage = (page) => {
        let pageNum = page + 1;
        this.setState({
            pageNum: pageNum,
            isLoading: true,
        })
    };

    async componentDidMount() {
        await this.getStudentsByPage(1);
    }

    async componentDidUpdate(prevProps, prevState) {
        let {pageNum} = this.state;
        if (prevState.pageNum !== this.state.pageNum) {
            await this.getStudentsByPage(pageNum);
        }
    }

    getStudentsByPage = async (page) => {
        const data = await StudentsApi.getStudentsByPage(page);
        if (data) {
            const { students, pageNum, pageSize, totalPage } = data;
            this.setState({
                students: students,
                isLoading: false,
                pageNum: pageNum,
                pageSize: pageSize,
                totalPage: totalPage,
            });
        }
    };

    render() {
        const {isLoading, students, pageSize, pageNum} = this.state;
        const count = 201;

        return (
            <MenuBar selected='Students' menu='Students' name='student'>
                {isLoading && <PageLoader/>}
                {!isLoading && students.length > 0 && <div>
                    <TableData
                        tableParams={students}
                        tableHeadArray={['Name', 'Email', 'Gender', 'Date of Birth', 'Credit', 'Details']}
                        tableBodyArray={['name', 'email', 'gender', 'DOB', 'credit']}
                        tableName='student'
                        page={0}
                        pageSize={pageSize}
                        tableApiDeleteMethod={StudentsApi.deleteStudent}
                    />
                    <TableControl
                        count={count}
                        page={pageNum - 1}
                        pageSize={pageSize}
                        changeCurrentPage={this.changeCurrentPage}
                    />
                </div>}
            </MenuBar>
        );
    }
}

export default Students;