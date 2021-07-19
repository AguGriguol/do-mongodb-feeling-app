import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'auth/components/Login';
import CreateFeeling from 'feelings/components/CreateFeeling';
import FeelingList from 'feelings/components/FeelingList';
import { useAppSelector } from 'app/root/hooks';

const RestrictedRoute = ({ path, Component }: { path: string; Component: any }) => {
  const status = useAppSelector(state => state.auth.status);
  return (
    <Route
      path={path}
      render={props => {
        if (status !== 'succeeded') return <Redirect to="/login" />;
        return <Component {...props}/>;
      }}
    />
  );
};

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/login" />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <RestrictedRoute Component={CreateFeeling} path="/feelings/:identifier"/>
    <RestrictedRoute Component={FeelingList} path="/feelings"/>
  </Switch>
);

export default Routes;
