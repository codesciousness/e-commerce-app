import React from 'react';
import Button from '@mui/material/Button';

const ContainedButton = ({ name, size, disableElevation, fullWidth, disabled, startIcon, endIcon, onClick }) => {
    const id = name.replaceAll(' ', '').toLowerCase();

    const margin = fullWidth ? '0.25rem 0' : null;

    return (
        <Button
            id={`${id}-button`}
            size={size}
            variant='contained'
            disableElevation={disableElevation}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            sx={{
                margin,
                color: 'white',
                backgroundColor: '#111',
                fontSize: '1rem',
                fontFamily: "Impact, 'Anton', 'Arial Narrow Bold', sans-serif",
                textTransform: 'uppercase',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: 'lightseagreen'
                }
            }}
        >
            {name}
        </Button>
    );
};

export default ContainedButton;