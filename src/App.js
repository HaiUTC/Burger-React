import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Layout from './hoc/Layout/Layout';
import BuggerBuilder from './containers/buggerBuilder/BuggerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Order from './containers/Orders/Orders';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/order" component={Order} />
                        <Route path="/check-out" component={CheckOut} />
                        <Route path="/" exact component={BuggerBuilder} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;