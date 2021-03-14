import React from 'react'
import Modal from '../../componets/UI/Modal/Modal'
import Aux from '../Auxx/Auxx'
import useHttpError from '../../hooks/http-error'


const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error,handlerError] =  useHttpError(axios)
        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={handlerError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
    }

}

export default withErrorHandler