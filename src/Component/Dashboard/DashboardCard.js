import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, Paper} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ClassIcon from '@material-ui/icons/Class';
import PeopleIcon from '@material-ui/icons/People';

const styles = {
    paper: {
        // width: '100%',
        width: '300px',
        height: '350px',
        margin: '10px',
        flexGrow: 1,
        textAlign: 'left',
        background: '#F4F3F3',
        '&:hover': {
            background: '#17977A',
            color: 'white',
            cursor: 'grab',
        },
        color: 'black'
    },
    iconWrapper: {
        height: '150px',
        width: '280px',
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#EBEBEB',
    },

    icon: {
        width: '70px',
        height: '70px',
        padding: '20px',
        color: 'white',
        borderRadius: '50%',
        background: '#C94251',
    },


    cardContent: {
        marginTop: '20px',
        height: '110px',
        textAlign: 'center',
        // color: 'black',
    },

    link: {
        textDecoration:'none'
    }
};

class DashboardCard extends Component{

    render() {
        const { classes, title, description, linkUrl, button1, button2, linkUrl1, linkUrl2 } = this.props;

        return (
            <Link to={linkUrl} style={{ textDecoration: 'none' }}>
                <Card className={classes.paper}>
                    <CardContent className={classes.iconWrapper}>
                        <LocalLibraryIcon className={classes.icon}/>
                    </CardContent>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h5" color='inherit'>
                            {title}
                        </Typography>
                        <Typography variant='subtitle1' color='inherit'>
                            {description}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        );
    }
}

DashboardCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardCard);