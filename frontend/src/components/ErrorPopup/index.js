import React from 'react';
import './styles.css';

export default class ErrorPopup extends React.Component {
    render() {
        return (
            <div className="popup-container">
                <div className="dismiss">
                    Dismiss
                </div>
            </div>
        )
    }
}