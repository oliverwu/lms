import React from 'react';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';

function AddNewButton(props) {
    const { name } = props;
    const url = `/${name}s/create`;

    return (
        <div>
            <Link to={url} style={{textDecoration: 'none'}}>
                <Button color='primary'>
                    <AddCircleIcon/> Add new {name}
                </Button>
            </Link>

        </div>
    )
}

export default AddNewButton;
