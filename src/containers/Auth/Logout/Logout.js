import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import './Logout.css';
const logout = props => {
    useEffect(() => {
        props.onLogout(props.history)
    })

    return <Redirect to='/' />
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(logout);