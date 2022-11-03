import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CheckBox = ({ label }) => {
    return (
        <FormGroup>
            <FormControlLabel
                label={label}
                control={
                    <Checkbox
                        size='small'
                        sx={{
                            '&.Mui-checked': {
                              color: 'LightSeaGreen'
                            }
                        }}
                    />
                }
            />
        </FormGroup>
    );
}

export default CheckBox;