import React, { Component } from 'react';
import DashboardCard from './DashboardCard';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";


class Dashboard extends Component {
    render() {
        return (
            <div>
                {/*<Typography variant='h2' component="h2" gutterBottom>*/}
                    {/*Dashboard*/}
                {/*</Typography>*/}
                <Grid container direction="row" >
                    <Grid item xs={12} lg={6}>
                        <Grid container
                              direction="row"
                              justify="center"
                              alignItems="center"
                        >
                            <DashboardCard
                                title={'Courses'}
                                description={'All kinds of courses needed for IT industry'}
                                button1={'Add new course'}
                                button2={'All courses'}
                                linkUrl1={'/courses/create'}
                                linkUrl2={'/courses'}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Grid container
                              direction="row"
                              justify="center"
                              alignItems="center"
                        >
                            <DashboardCard
                                title={'Lectures'}
                                description={'Best lecturers in IT world'}
                                button1={'Add new lecture'}
                                button2={'All lectures'}
                                linkUrl1={'/lectures/create'}
                                linkUrl2={'/lectures'}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Grid container
                              direction="row"
                              justify="center"
                              alignItems="center"
                        >
                            <DashboardCard
                                title={'Students'}
                                description={'Hard-working and smart students'}
                                button1={'Add new student'}
                                button2={'All students'}
                                linkUrl1={'/students/create'}
                                linkUrl2={'/students'}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;