import { Route, Switch } from 'react-router-dom';
import Login from 'auth/components/Login';
import CreateFeeling from 'feelings/components/CreateFeeling';

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/new">
      <CreateFeeling />
    </Route>
  </Switch>
);

export default Routes;
