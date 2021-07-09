import { Route, Switch } from 'react-router-dom';
import Login from 'auth/components/Login';

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
  </Switch>
);

export default Routes;
