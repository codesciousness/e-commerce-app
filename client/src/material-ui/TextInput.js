import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ name, value, type, placeholder, onChange }) => {
    const id = name.replaceAll(' ', '').toLowerCase();

    return (
        <TextField
            id={id}
            name={id}
            value={value}
            label={name}
            type={type}
            placeholder={placeholder ? placeholder : `Enter your ${name.toLowerCase()}`}
            onChange={onChange}
            fullWidth
            size='small'
            margin='dense'
            InputLabelProps={{
                style: { color: 'LightSeaGreen' }
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'White',
                    '& fieldset': {
                        border: '1px solid Black',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'LightSeaGreen',
                    }
                }
            }}
        >
            {value}
        </TextField>
    );
};

export default TextInput;