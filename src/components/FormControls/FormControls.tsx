import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Paper,
  FormControl,
  InputAdornment,
  FormLabel,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Input from '../UI/Input/Input';

type ControlFieldType = {
  [key: string]: string | number;
};

type FormControlsProps = {
  label: string;
  data: Panel | PanelElement;
  onUpdate: (event: React.ChangeEvent) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '16px',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    formControl: {
      paddingBottom: '8px',
      paddingRight: '8px',
    },
  })
);

const FormControls = (props: FormControlsProps) => {
  const classes = useStyles(props);
  const { t } = useTranslation();
  return (
    <Paper className={classes.root}>
      <FormLabel>{props.label}</FormLabel>
      <form className={classes.form}>
        {Object.entries(props.data).map(([key, value]) => {
          if (['id', 'type'].includes(key)) {
            // ignore not changeable fields
            return null;
          }
          let type = 'text';
          let adornmentLabel = '';
          if (typeof value === 'number') {
            type = 'number';
            adornmentLabel = t('ui.px');
          }

          return (
            <FormControl key={key.toString()} className={classes.formControl}>
              <Input
                variant="filled"
                label={t(`ui.constructor.controls.${key}`)}
                value={value}
                type={type}
                inputProps={{
                  'data-name': key,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {adornmentLabel}
                    </InputAdornment>
                  ),
                }}
                onChange={props.onUpdate}
              />
            </FormControl>
          );
        })}
      </form>
    </Paper>
  );
};

export default React.memo(FormControls);
