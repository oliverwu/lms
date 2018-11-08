import React, {Component, PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = theme => {
    return {
        root: {
            height: '30px',
            margin: '0 -24px',
        }
    }
};

class Header extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Divider/>
            </div>
        );
    }

}

export default withStyles(styles)(Header);


<AppBar position="fixed" className={classes.appBar} color=''>
    <Toolbar>
        <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
            Responsive drawer
        </Typography>
    </Toolbar>
</AppBar>