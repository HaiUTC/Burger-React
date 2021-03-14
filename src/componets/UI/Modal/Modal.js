import React, { Component } from 'react';
import Aux from '../../../hoc/Auxx/Auxx';
import BackDrop from '../BackDrop/BackDrop';
import './Modal.css'
const modal = props => {

    return (
        <div>
            <Aux>
                <BackDrop show={props.show} clicked={props.modalClosed} />
                <div
                    className='Modal'
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
            </Aux>
        </div>
    );

}

export default React.memo(modal,(prevProps, nextProps) => (nextProps.show !== prevProps.show || nextProps.children !== prevProps.children));