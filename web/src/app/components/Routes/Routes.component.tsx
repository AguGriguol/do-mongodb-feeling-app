import { Route, Switch } from 'react-router-dom';
import Login from 'auth/components/Login';
import CreateFeeling from 'feelings/components/CreateFeeling';
import FeelingList from 'feelings/components/FeelingList';

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/feelings/:identifier">
      <CreateFeeling />
    </Route>
    <Route path="/feelings">
      <FeelingList />
    </Route>
  </Switch>
);

export default Routes;
