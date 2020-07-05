import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper,
  FormLabel,
  FormControl,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { RootState } from '../../store';
import { login } from './actions';
import Input from '../../components/UI/Input/Input';

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
  const [data, setData] = useState({
    email: {
      value: '',
    },
    password: {
      value: '',
    },
  });

  const handleOnChange = (event: React.ChangeEvent) => {
    const fieldName = event.target.getAttribute('data-name') as
      | 'email'
      | 'password';
    let fieldValue: string = (event.target as HTMLInputElement).value;

    if (fieldName !== null) {
      setData((state) => ({
        ...state,
        [fieldName]: {
          ...state[fieldName],
          value: fieldValue,
        },
      }));
    }
  };
  const handleOnLogin = () => {
    dispatch(login(data.email.value, data.password.value));
  };
  return (
    <Paper className={classes.root}>
      <form className={classes.form}>
        <FormLabel className={classes.formLabel}>
          {t(`ui.authorization.loginDescription`)}
        </FormLabel>
        <FormControl>
          <Input
            variant="filled"
            label={t(`ui.authorization.controls.email`)}
            value={data.email.value}
            className={classes.formInput}
            inputProps={{
              'data-name': 'email',
            }}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl>
          <Input
            variant="filled"
            label={t(`ui.authorization.controls.password`)}
            value={data.password.value}
            className={classes.formInput}
            inputProps={{
              'data-name': 'password',
            }}
            onChange={handleOnChange}
          />
        </FormControl>

        {isAuthInProgress ? (
          <CircularProgress className={classes.loading} />
        ) : (
          <Button variant="contained" color="primary" onClick={handleOnLogin}>
            {t('ui.authorization.controls.login')}
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default Authorization;
