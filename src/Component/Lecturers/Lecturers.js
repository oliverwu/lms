import React, { Component, PureComponent } from 'react';
import LecturersApi from './LecturersApi';
import LecturersTable from './LecturersTable';
import PageLoader from '../Utils/PageLoader';
import MenuBar from '../Layout/MenuBar';

class Lecturers extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            lecturers: [],
            isLoading: true,
        }
    }

    async componentDidMount() {
        const lecturers = await LecturersApi.getAllLecturers();
        lecturers && this.setState({
            lecturers: lecturers,
            isLoading: false,
        })
    }

    render() {
        const { lecturers, isLoading } = this.state;

        return (
            <MenuBar menu='Lecturers' selected='Lecturers' name='lecturer'>
                {isLoading && <PageLoader/>}
                {!isLoading && <LecturersTable lecturers = {lecturers} />}
            </MenuBar>
        );
    }
}

export default Lecturers;