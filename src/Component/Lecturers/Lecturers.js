import React, { Component, PureComponent } from 'react';
import LecturersApi from './LecturersApi';
import LecturersTable from './LecturersTable';
import PageLoader from '../Utils/PageLoader';
import Layout from '../Layout/Layout';

class Lecturers extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            lecturers: [],
            isLoading: true,
        }
    }

    async componentDidMount() {
        const data = await LecturersApi.getAllLecturers();
        const lecturers = data.lecturers.map(lecturer => {
            return {
                id: lecturer.id,
                name: lecturer.name,
                email: lecturer.email,
                staffNumber: lecturer.staffNumber,
            }
        });
        this.setState({
            lecturers: lecturers,
            isLoading: false,
        })
    }



    render() {
        const { lecturers, isLoading } = this.state;

        return (
            <Layout selected='Lecturers' menu='LECTURERS'>
                {isLoading && <PageLoader/>}
                {!isLoading && <LecturersTable lecturers = {lecturers} />}
            </Layout>
        );
    }
}

export default Lecturers;