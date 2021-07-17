import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'auth/components/Login';
import CreateFeeling from 'feelings/components/CreateFeeling';
import FeelingList from 'feelings/components/FeelingList';
import { useAppSelector } from 'app/root/hooks';
import { ReactNode } from 'react';

const RestrictedRoute = ({ path, component }: { path: string; component: ReactNode }) => {
  const status = useAppSelector(state => state.auth.status);
  return (
    <Route
      path={path}
      render={() => {
        if (status !== 'succeeded') return <Redirect to="/login" />;
        return component;
      }}
    />
  );
};

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <RestrictedRoute component={<CreateFeeling />} path="/feelings/:identifier"/>
    <RestrictedRoute component={<FeelingList />} path="/feelings"/>
  </Switch>
);

export default Routes;
