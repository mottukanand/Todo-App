import React, { Component,Suspense  } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
const Dashboard = React.lazy(() => import('../pages/dashboard'));
const TodoList = React.lazy(() => import('../pages/Todo'));



class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/todo" />} />
                    <Route exact path="/todo" render={() => <Suspense fallback={<div>Loading</div>}><TodoList /></Suspense>} />
                </Switch>
            </Router>
        );
    }
}
export default Routes;