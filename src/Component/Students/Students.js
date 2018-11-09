import React, {Component, PureComponent} from 'react';
import StudentsApi from './StudentsApi';
import StudentsTable from './StudentsTable';
import PageLoader from '../Utils/PageLoader';
import { withStyles } from '@material-ui/core/styles';
import StudentsTableControl from './StudentsTableControl';
import MenuBar from '../Layout/MenuBar';

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

    // async componentDidMount() {
    //     const data = await StudentsApi.getStudentsByPage(1);
    //     const { students, pageNum, pageSize, totalPage } = data;
    //     this.setState({
    //         pageNum: pageNum,
    //         pageSize: pageSize,
    //         students: students,
    //         totalPage: totalPage,
    //         isLoading: false,
    //     })
    // }

    // async componentDidUpdate(prevProps, prevState) {
    //     let {currentPage} = this.state;
    //     if (prevState.currentPage !== this.state.currentPage) {
    //         const data = await StudentsApi.getStudentsByPage(currentPage);
    //         const { students } = data;
    //         this.setState({
    //             students: students,
    //             isLoading: false
    //         });
    //     }
    // }

    componentDidMount() {
        this.getStudentsByPage(1);
    }

    componentDidUpdate(prevProps, prevState) {
        let {currentPage} = this.state;
        if (prevState.currentPage !== this.state.currentPage) {
            this.getStudentsByPage(currentPage);
        }
    }

    getStudentsByPage = (page) => {
        StudentsApi.getStudentsByPage(page).then(data => {
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
        });
    };

    render() {
        const {isLoading, students, pageSize, currentPage} = this.state;
        const {classes} = this.props;

        return (
            <MenuBar selected='Students' menu='Students' name='student'>
                {isLoading && <PageLoader/>}
                {!isLoading && students.length >0 && <div>
                    <StudentsTable students = {students}/>
                    <StudentsTableControl pageSize={pageSize} page={currentPage - 1} changeCurrentPage={this.changeCurrentPage}/>
                </div>}
            </MenuBar>
        );
    }
}

export default withStyles(styles)(Students);