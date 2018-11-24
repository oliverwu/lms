import React, {Component} from 'react';
import TableControl from "../Utils/TableControl";
import TableData from "../Utils/TableData";
import { connect } from 'react-redux';

const state = state => {
    return {
        lecturers: state.lecturers.lecturers,
        pageSize: state.lecturers.pageSize,
        amount: state.lecturers.amount,
        pageNum: state.lecturers.pageNum,
    }
};

class LecturersTable extends Component {

    render() {
        const { lecturers, pageSize, handleDeleteLecturer, amount, handleChangePageSize, pageNum, changeCurrentPage } = this.props;

        return (
            <div>
                <TableData
                    tableParams={lecturers}
                    tableHeadArray={['Name', 'Email', 'Staff Number', 'Details']}
                    tableBodyArray={['name','email', 'staffNumber']}
                    tableName='lecturer'
                    page={0}
                    pageSize={pageSize}
                    tableApiDeleteMethod={handleDeleteLecturer}
                    minWidth='550px'
                />
                <TableControl
                    handleChangePageSize={handleChangePageSize}
                    count={amount}
                    page={pageNum - 1}
                    pageSize={pageSize}
                    changeCurrentPage={changeCurrentPage}
                />
            </div>
        );
    }

}

export default connect(state)(LecturersTable);
