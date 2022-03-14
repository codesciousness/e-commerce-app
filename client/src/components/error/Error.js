import React from 'react';
import './Error.css';

const Error = ({ msg }) => {
    return (
        <p className="Error">{msg}</p>
    );
}

export default Error;