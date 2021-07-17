import { MoveFocusInside } from 'react-focus-lock';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import type { LoginFormSchema } from 'auth/models/login';
import { useAppDispatch, useAppSelector, useDidMountEffect } from '../../../app/root/hooks';
import TextFormField from 'utils/components/TextFormField';
import { login } from '../../ducks/login.auth';
import { useStyles } from './LoginForm.styles';

const loginSchema = yup.object().shape<LoginFormSchema>({
  username: yup.string().required('Username is required')
});

const loginDefaultSchema: LoginFormSchema = {
  username: ''
};

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.auth.status);

  useDidMountEffect(() => {
    if (status === 'failed') enqueueSnackbar('An error has been occurred, please try again later.', { variant: 'error'});
    else if (status === 'succeeded') history.replace('/feelings');
  },[status]);

  const handleSubmit = async (_: LoginFormSchema) => {
    void dispatch(login({ username: _.username }));
  };

  return (
    <Formik initialValues={loginDefaultSchema} onSubmit={handleSubmit} validationSchema={loginSchema}>
      <Form>
        <MoveFocusInside>
          <Field component={TextFormField} id="username" label="Username" name="username" />
        </MoveFocusInside>
        {status === 'logging' &&
          <Box className={classes.loading}>
            <CircularProgress size={24}/>
          </Box>
        }
        {status !== 'logging' &&
          <Button color="primary" disableElevation fullWidth size="large" type="submit" variant="contained">
            Login
          </Button>
        }
      </Form>
    </Formik>
  );
};

export default LoginForm;
