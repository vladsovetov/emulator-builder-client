import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper, FormLabel, Button, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { RootState } from '../../store';
import { login } from './actions';
import Input from '../../components/UI/Input/Input';

type FieldType = {
  value: string;
  required?: boolean;
  test?: RegExp;
  error: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 480,
      padding: 16,
      margin: '0 auto',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formLabel: {
      marginBottom: 16,
    },
    formInput: {
      marginBottom: 8,
    },
    loading: {
      alignSelf: 'center',
    },
  })
);

const Authorization = () => {
  const isAuthInProgress = useSelector(
    (state: RootState) => state.authorization.isAuthInProgress
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const [data, setData] = useState<{ [key: string]: FieldType }>({
    email: {
      value: '',
      required: true,
      test: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error: '',
    },
    password: {
      value: '',
      required: true,
      error: '',
    },
  });

  const handleOnChange = (event: React.ChangeEvent) => {
    const fieldName = event.target.getAttribute('data-name') as
      | 'email'
      | 'password';
    let fieldValue: string = (event.target as HTMLInputElement).value;

    if (fieldName !== null) {
      const updatedField = {
        ...data[fieldName],
        value: fieldValue,
      };
      // reset error while user is editing the value in the field
      updatedField.error = '';
      setData((state) => ({
        ...state,
        [fieldName]: updatedField,
      }));
    }
  };

  const handleOnBlur = (event: React.ChangeEvent) => {
    const fieldName = event.target.getAttribute('data-name') as
      | 'email'
      | 'password';

    if (fieldName !== null) {
      const updatedField = {
        ...data[fieldName],
      };
      // reset error while user is editing the value in the field
      updatedField.error = getFieldValidationError(updatedField);
      setData((state) => ({
        ...state,
        [fieldName]: updatedField,
      }));
    }
  };

  const getFieldValidationError = (field: FieldType) => {
    if (field.required && !field.value) {
      return t('ui.authorization.errors.mandatoryField');
    }
    if (field.test && !field.test.test(field.value)) {
      return t('ui.authorization.errors.incorrectFormat');
    }
    return '';
  };

  const getValidationResult = () => {
    let isValid = true;
    const validatedData = { ...data };
    for (const [fieldKey, field] of Object.entries(data)) {
      const error = getFieldValidationError(field);
      if (error) {
        isValid = false;
        validatedData[fieldKey] = {
          ...validatedData[fieldKey],
          error,
        };
      } else {
        validatedData[fieldKey] = {
          ...validatedData[fieldKey],
          error: '',
        };
      }
    }
    return {
      isValid,
      validatedData,
    };
  };

  const handleOnLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const validatedResult = getValidationResult();
    if (validatedResult.isValid) {
      dispatch(login(data.email.value, data.password.value));
    } else {
      setData(validatedResult.validatedData);
    }
  };
  return (
    <Paper className={classes.root}>
      <form className={classes.form} onSubmit={handleOnLogin}>
        <FormLabel className={classes.formLabel}>
          {t(`ui.authorization.loginDescription`)}
        </FormLabel>
        <Input
          variant="filled"
          label={t(`ui.authorization.controls.email`)}
          value={data.email.value}
          className={classes.formInput}
          inputProps={{
            'data-name': 'email',
          }}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          error={data.email.error !== ''}
          helperText={data.email.error}
        />
        <Input
          variant="filled"
          label={t(`ui.authorization.controls.password`)}
          value={data.password.value}
          className={classes.formInput}
          inputProps={{
            'data-name': 'password',
            type: 'password',
          }}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          error={data.password.error !== ''}
          helperText={data.password.error}
        />

        {isAuthInProgress ? (
          <CircularProgress className={classes.loading} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOnLogin}
            type="submit"
          >
            {t('ui.authorization.controls.login')}
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default Authorization;
