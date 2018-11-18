import React, {Component} from 'react';
import LecturersApi from "./LecturersApi";
import TableControl from "../Utils/TableControl";
import TableData from "../Utils/TableData";
import { connect } from 'react-redux';

const state = state => {
    return {
        allLecturers: state.lecturers.allLecturers,
    }
};

class LecturersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }

    changeCurrentPage = (page) => {
        this.setState({
            page:page,
        })
    };


    render() {
        const { allLecturers } = this.props;
        const { page } = this.state;
        const pageSize = 5;
        console.log(allLecturers);

        return (
            <div>
                <TableData
                    tableParams={allLecturers}
                    tableHeadArray={['Name', 'Email', 'Staff Number', 'Details']}
                    tableBodyArray={['name','email', 'staffNumber']}
                    tableName='lecturer'
                    page={page}
                    pageSize={pageSize}
                    tableApiDeleteMethod={LecturersApi.deleteLecturer}
                    minWidth='550px'
                />
                <TableControl
                    count={allLecturers.length}
                    page={page}
                    pageSize={pageSize}
                    changeCurrentPage={this.changeCurrentPage}
                />
            </div>
        );
    }

}

export default connect(state)(LecturersTable);
