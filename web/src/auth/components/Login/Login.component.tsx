import { Container } from '@material-ui/core';
import Main from 'utils/components/Main';
import RouteWrapper from 'auth/components/RouteWrapper';
import Title from 'auth/components/Title';
import LoginForm from 'auth/components/LoginForm';

const Login = () => (
  <Container>
    <Main>
      <RouteWrapper>
        <Title>Feeling App</Title>
        <LoginForm />
      </RouteWrapper>
    </Main>
  </Container>
);

export default Login;
