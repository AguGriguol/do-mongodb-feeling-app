import { MoveFocusInside } from 'react-focus-lock';
import { useHistory } from 'react-router-dom';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import TextFormField from 'utils/components/TextFormField';
import type { LoginFormSchema } from 'auth/models/login';

const loginSchema = yup.object().shape<LoginFormSchema>({
  username: yup.string().required('Identifier is required')
});

const loginDefaultSchema: LoginFormSchema = {
  username: ''
};

const LoginForm = () => {
  const history = useHistory();

  const handleSubmit = async (_: LoginFormSchema, { setSubmitting }: FormikHelpers<LoginFormSchema>) => {
    try {
      setSubmitting(false);

      history.push('/');
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={loginDefaultSchema} onSubmit={handleSubmit} validationSchema={loginSchema}>
      <Form>
        <MoveFocusInside>
          <Field component={TextFormField} id="username" label="Username" name="username" />
        </MoveFocusInside>
        <Button color="primary" disableElevation fullWidth size="large" type="submit" variant="contained">
          Login
        </Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
