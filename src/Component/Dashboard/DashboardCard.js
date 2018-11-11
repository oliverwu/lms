import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        width: '100%',
        height: 250,
        margin: '25px 5px',
        textAlign: 'left',
        // background: 'white',
    },

    cardContent: {
        height: '180px',
    },

    link: {
        textDecoration:'none'
    }
};

class DashboardCard extends Component{

    render() {
        const { classes, title, description, button1, button2, linkUrl1, linkUrl2 } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h3" component="h3" >
                        {title}
                    </Typography>
                    <Typography variant='subtitle1' >
                        {description}
                    </Typography>
                </CardContent>
                <CardActions >
                    <Link to={linkUrl1} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            disableRipple
                            fullWidth
                            className={classes.link}
                        >
                            {button1}
                        </Button>
                    </Link>
                    <Link to={linkUrl2} style={{ textDecoration: 'none' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            disableRipple
                            fullWidth
                        >
                            {button2}
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

DashboardCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardCard);