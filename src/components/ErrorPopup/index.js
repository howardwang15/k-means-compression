import React from 'react';
import './styles.css';

export default class ErrorPopup extends React.Component {
    render() {
        return (
            <div className="popup-container">
                <div className="content">
                    <img src="https://mgreena0.files.wordpress.com/2012/04/red-warning-sign.jpg" width='50px'/>
                    <div className="message">{this.props.message}</div>
                    <div className="dismiss" onClick={this.props.onClose}>
                        Dismiss
                    </div>
                </div>
            </div>
        )
    }
}