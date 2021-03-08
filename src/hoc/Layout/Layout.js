import React, { Component } from 'react';
import './Layout.css'
import Aux from '../Auxx/Auxx'
import Toolbar from '../../componets/Navigation/Toolbar/Toolbar'
import SideDraw from '../../componets/Navigation/SideDraw/SideDraw'
class Layout extends Component {
    state = {
        showSideDraw : false
    }

    sideDrawClosedHandler = () =>{
        this.setState({
            showSideDraw : false
        })
    }

    sideDrawToggleHandler = () =>{
        this.setState((preState)=>{
           return { showSideDraw : ! preState.showSideDraw }
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar drawToggleClick={this.sideDrawToggleHandler}/>
                <SideDraw 
                    open={this.state.showSideDraw} 
                    closed = {this.sideDrawClosedHandler}/>
                <main className='content'>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;