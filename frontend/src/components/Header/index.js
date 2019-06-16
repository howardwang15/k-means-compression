import React from 'react';
import './styles.css';

export default class Header extends React.Component {
    render() {
        return (
            <div id='header'>
                <div>
                    <div className='overlay'>
                        <h1>Welcome to K-means Compression!</h1>
                    </div>
                </div>
            </div>
        )
    }
}
