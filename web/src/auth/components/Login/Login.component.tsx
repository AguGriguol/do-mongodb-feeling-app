import { Container } from '@material-ui/core';
import Main from 'utils/components/Main';
import RouteWrapper from 'auth/components/RouteWrapper';
import Title from 'auth/components/Title';

const Login = () => (
  <Container>
    <Main>
      <RouteWrapper>
        <Title>Feeling App</Title>
      </RouteWrapper>
    </Main>
  </Container>
);

export default Login;
