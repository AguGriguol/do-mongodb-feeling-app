import { Route, Switch } from 'react-router-dom';
import Login from 'auth/components/Login';
import CreateFeeling from 'feelings/components/CreateFeeling';
import FeelingList from 'feelings/components/FeelingList';

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/new">
      <CreateFeeling />
    </Route>
    <Route path="/">
      <FeelingList />
    </Route>
  </Switch>
);

export default Routes;
