import React, { Component } from 'react';
import Aux from '../../../hoc/Auxx/Auxx';
import BackDrop from '../BackDrop/BackDrop';
import './Modal.css'
class Modal extends Component {

    shouldComponentUpdate (nextProps, nextState) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children)
    }

    componentDidUpdate(){
    }

    render() {
        return (
            <div>
                <Aux>
                    <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
                    <div
                        className='Modal'
                        style={{
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }}>
                        {this.props.children}
                    </div>
                </Aux>
            </div>
        );
    }
}

export default Modal;