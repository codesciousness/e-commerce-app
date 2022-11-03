import React from 'react';
import Alert from '@mui/material/Alert';

const AlertMsg = ({ msg, severity, color, onClose }) => {
    return (
        <Alert
            severity={severity}
            color={color}
            onClose={onClose}
            sx={{
                margin: '0.5rem 0'
            }}
        >
            {msg}
        </Alert>
    );
};

export default AlertMsg;