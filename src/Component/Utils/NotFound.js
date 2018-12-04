import React, { Fragment } from 'react';
import './NotFound.css';

const NotFound = () => {
    return <div className='not-found'>
            <div className='not-found__content'>
                <h1>Page Not Found</h1>
                <p>Sorry, but the page you were trying to view does not exist.</p>
            </div>
        </div>
};

export default NotFound;