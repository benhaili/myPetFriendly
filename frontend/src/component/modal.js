import React from 'react'
import '../css/modal.css'
export default class ModalMessage extends React.Component {
    render () {
        if (!this.props.show) {
            return null
        }

        return (

            <div>
                <div className='Modal shadow-lg p-3 mb-5 bg-white rounded border border-danger'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h1 className='w-50 mx-auto modal-title '>ATTENTION</h1>
                            </div>
                            <div className='modal-body'>
                                <h5 className='mx-auto'>{this.props.children}</h5>
                            </div>
                            <div className='modal-footer'>
                                <button className='btn btn-outline-danger w-50' onClick={this.props.onHandleonCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
