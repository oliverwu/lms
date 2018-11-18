import React, { PureComponent, Fragment } from 'react';
import AppBar from '../Layout/AppBar';
import LecturersTable from './LecturersTable';
import PageLoader from '../Utils/PageLoader';
import MenuBar from '../Layout/MenuBar';
import { connect } from 'react-redux';
import { handleReceivedAllLecturersData, clearLecturersData } from "../../Actions/LecturersActions";
import ForbidErrorDialog from "../Utils/ForbidErrorDialog";

const state = state => {
    return {
        allLecturers: state.lecturers.allLecturers,
        isLoading: state.lecturers.isLoading,
    }
};

class Lecturers extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            lecturers: [],
            isLoading: true,
        }
    }

    componentDidMount() {
        this.props.dispatch(handleReceivedAllLecturersData())
    }

    clearData = () => {
        this.props.dispatch(clearLecturersData())
    };

    render() {
        const { isLoading, allLecturers } = this.props;

        return (
            <Fragment>
                <AppBar/>
                <MenuBar menu='Lecturers' selected='Lecturers' name='lecturer'>
                    {isLoading && <PageLoader/>}
                    {!isLoading && !allLecturers && <ForbidErrorDialog clearData = {this.clearData}/>}
                    {!isLoading && allLecturers && <LecturersTable />}
                </MenuBar>
            </Fragment>
        );
    }
}

export default connect(state)(Lecturers);