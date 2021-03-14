import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import './Layout.css'
import Aux from '../Auxx/Auxx'
import Toolbar from '../../componets/Navigation/Toolbar/Toolbar'
import SideDraw from '../../componets/Navigation/SideDraw/SideDraw'
const layout = (props) => {
    const [showSideDraw, setShowSideDraw] = useState(false)

    const sideDrawClosedHandler = () => {
        setShowSideDraw(false)
    }

    const sideDrawToggleHandler = () => {
        setShowSideDraw(!showSideDraw)
    }
    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawToggleClick={sideDrawToggleHandler} />
            <SideDraw
                isAuth={props.isAuthenticated}
                open={showSideDraw}
                closed={sideDrawClosedHandler} />
            <main className='content'>
                {props.children}
            </main>
        </Aux>
    );

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(layout);