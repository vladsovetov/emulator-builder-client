import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';

const Input = (props: TextFieldProps) => <TextField {...props} />;

export default React.memo(Input);
