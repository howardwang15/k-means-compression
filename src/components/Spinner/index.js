import React from 'react';
import Loader from '../../static/loader.gif';
import './styles.css';

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="spinner-container">
                <img src={Loader} width="20%" className="spinner" />
            </div>
        )
    }
}