import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        width: '100%',
        height: 300,
        position: 'relative',
        margin: '25px 10px',
    },

    cardContentTitle: {
        backgroundColor: '#3748AC',
        color: 'white',
        padding: '20px 0',
        textAlign:'center',
    },

    cardContentDescription: {
        height: '115px',
    },

    cardButton: {
        // position: 'absolute',
        // bottom:'10px',
        // width: '250'
        // width: '100px',
        // margin: '0 75px',
    },
};

class MediaCard extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, title, description, id } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent >
                    <Typography gutterBottom variant="h4"  gutterBottom className={classes.cardContentTitle}>
                        {title}
                    </Typography>
                    <Typography variant='subtitle1' component="p" className={classes.cardContentDescription}>
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardButton}>
                    <Link to={`courses/${id}`} style={{textDecoration: 'none', width: '100%'}}>
                        <Button
                            variant="contained"
                            color="secondary"
                            disableRipple
                            fullWidth
                        >
                            open
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);