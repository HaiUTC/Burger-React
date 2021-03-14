import React, {  useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import * as action from './store/actions/index';


const CheckOut = React.lazy( () =>{
    return import('./containers/CheckOut/CheckOut')
})

const BuggerBuilder = React.lazy( () =>{
    return import('./containers/buggerBuilder/BuggerBuilder')
})

const Orders = React.lazy( () =>{
    return import('./containers/Orders/Orders')
})

const Auth = React.lazy( () =>{
    return import('./containers/Auth/Auth')
})

const Logout = React.lazy( () =>{
    return import('./containers/Auth/Logout/Logout')
})


const app = (props) =>{
    useEffect(()=>{
        props.onTryAutoSignUp()
    },[])

        return (
            <div>
                <Layout>
                    
                    <Suspense fallback={<p>Loadding.....</p>}>
                    <Switch>
                        <Route path="/auth" render={(props) => <Auth {...props}/>} />
                        <Route path="/order" render={(props) => <Orders {...props}/>} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/check-out" render={(props) => <CheckOut {...props}/>} />
                        <Route path="/" exact component={BuggerBuilder} />
                    </Switch>
                    </Suspense>
                </Layout>
            </div>
        );
    }
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(action.authCheckState())
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app))