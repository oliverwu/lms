import React, {Component} from 'react';
import LecturersApi from "./LecturersApi";
import TableControl from "../Utils/TableControl";
import TableData from "../Utils/TableData";

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
        const { lecturers } = this.props;
        const { page } = this.state;
        const pageSize = 5;

        return (
            <div>
                <TableData
                    tableParams={lecturers}
                    tableHeadArray={['Name', 'Email', 'Staff Number', 'Details']}
                    tableBodyArray={['name','email', 'staffNumber']}
                    tableName='lecturer'
                    page={page}
                    pageSize={pageSize}
                    tableApiDeleteMethod={LecturersApi.deleteLecturer}
                />
                <TableControl
                    count={lecturers.length}
                    page={page}
                    pageSize={pageSize}
                    changeCurrentPage={this.changeCurrentPage}
                />
            </div>
        );
    }

}

export default LecturersTable;
