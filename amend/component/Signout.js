import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/alert';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default function Signout(props) {
    const classes = useStyles();

     return (
    <div className={classes.root}>
      <Alert
        action={
          <Button color="inherit" size="small">
            Yes
          </Button>
        }
      >
        Are you sure you want to sign out?
      </Alert>
    </div>
  );
}