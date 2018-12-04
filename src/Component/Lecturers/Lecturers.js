import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import PageLoader from '../Utils/PageLoader';
import MenuBar from '../Layout/MenuBar';
import { connect } from 'react-redux';
import {
    handleReceivedLecturersDataByPage,
    clearLecturersData,
    handleDeleteLecturerData
} from "../../Actions/LecturersActions";
import ForbidErrorDialog from "../Utils/ForbidErrorDialog";
import TableData from "../Utils/TableData";
import TableControl from "../Utils/TableControl";

const state = state => {
    return {
        pageNum: state.lecturers.pageNum,
        pageSize: state.lecturers.pageSize,
        totalPage: state.lecturers.totalPage,
        lecturers: state.lecturers.lecturers,
        isLoading: state.lecturers.isLoading,
        amount: state.lecturers.amount,
        statusCode: state.lecturers.statusCode,
        lecturerStatusCode: state.lecturer.statusCode,
    }
};

class Lecturers extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            forbidErrorDialogStatus: false,
            errorStatusCode: null,
        }
    }

    componentWillMount() {
        this.props.dispatch(clearLecturersData())
    }

    async componentDidMount() {
        await this.props.dispatch(handleReceivedLecturersDataByPage(this.props.pageSize, this.props.pageNum));
        this.props.statusCode > 300 && this.setState({
            forbidErrorDialogStatus: true,
            errorStatusCode: this.props.statusCode,
        })
    }

    handleDeleteLecturer = async (id) => {
        await this.props.dispatch(handleDeleteLecturerData(id));
        if (this.props.studentStatusCode > 300) {
            this.setState({
                forbidErrorDialogStatus: true,
                errorStatusCode: this.props.lecturerStatusCode,
            })
        } else {
            const { pageSize, pageNum } = this.props;
            this.props.dispatch(clearLecturersData());
            this.props.dispatch(handleReceivedLecturersDataByPage(pageSize, pageNum))
        }
    };

    changeCurrentPage = (page) => {
        let pageNum = page + 1;
        this.props.dispatch(clearLecturersData());
        this.props.dispatch(handleReceivedLecturersDataByPage(this.props.pageSize, pageNum))
    };

    handleChangePageSize = (pageSize, pageNum) => {
        this.props.dispatch(clearLecturersData());
        this.props.dispatch(handleReceivedLecturersDataByPage(pageSize, pageNum));
    };

    handleForbidErrorDialogClose = () => {
        this.setState({
            forbidErrorDialogStatus: false,
        })
    };

    render() {
        const { forbidErrorDialogStatus, errorStatusCode } = this.state;
        const { isLoading, lecturers, pageSize, pageNum, amount } = this.props;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar menu='Lecturers' selected='Lecturers' name='lecturer'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && lecturers && <div>
                        <TableData
                            tableParams={lecturers}
                            tableHeadArray={['Name', 'Email', 'Staff Number','Bibliography', 'Details']}
                            tableBodyArray={['name','email', 'staffNumber', 'bibliography']}
                            tableName='lecturer'
                            page={0}
                            pageSize={pageSize}
                            tableElementDeleteMethod={this.handleDeleteLecturer}
                            minWidth='550px'
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

export default connect(state)(Lecturers);